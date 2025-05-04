# from django.shortcuts import render
# from rest_framework import generics, permissions, status
# from .models import Order, OrderItem
# from .serializers import OrderItemSerializer, OrderSerializer
# from ..cart.models import CartItem


# class OrderListCreateAPIView(generics.ListCreateAPIView):
#     serializer_class = OrderSerializer
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get_queryset(self):
#         return Order.objects.filter(user=self.request.user)
    
#     def perform_create(self, serializer):
#         user = self.request.user
#         cart_items = CartItem.objects.filter(user=user)
        
#         if not cart_items.exists():
#             raise serializer.ValidationError('Cart is Empty')
        
#         order = serializer.save(user=user, total_amount=0)
#         total_amount = 0
        
#         for item in cart_items:
#             price = item.product.price
#             OrderItem.objects.create(
#                 order = order,
#                 product = item.product,
#                 quantity = item.quantity,
#                 price = price
#             )
#             total_amount += price*item.quantity
#             item.delete()
            
#         order.total_amount = total_amount
#         order.save()


from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Order, OrderItem
from .serializers import OrderItemSerializer, OrderSerializer
from ..cart.models import CartItem, Cart
from ..product.models import Product  # Update path as per your app structure

class OrderListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        user = request.user
        cart_items = CartItem.objects.filter(user=user).select_related('product')

        if not cart_items.exists():
            raise ValidationError('Cart is empty')

        address_id = request.data.get("address_id")
        payment_method = request.data.get("payment_method", "COD")

        if not address_id:
            raise ValidationError("Address ID is required.")

        order = Order.objects.create(
            user=user,
            address_id=address_id,
            payment_method=payment_method,
            total_amount=0
        )

        total_amount = 0

        for item in cart_items:
            product = item.product
            if product.inventory < item.quantity:
                raise ValidationError(f"Insufficient inventory for {product.name}")

            # Reduce inventory
            product.inventory -= item.quantity
            product.save()

            # Create order item
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item.quantity,
                price=product.price
            )

            total_amount += product.price * item.quantity

        order.total_amount = total_amount
        order.save()

        # Clear the cart
        cart_items.delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
