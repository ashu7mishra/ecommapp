from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .models import Order, OrderItem
from .serializers import OrderItemSerializer, OrderSerializer
from ..cart.models import CartItem
from ..product.models import Product
from ..address.models import Address

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
        if not address_id:
            try:
                address = Address.objects.get(user=user, is_default=True)
                address_id = address.id
            except Address.DoesNotExist as e:
                raise ValidationError("No default address found. Please provide an address_id.") from e

        payment_method = request.data.get("payment_method", "COD")

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

            product.inventory -= item.quantity
            product.save()

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item.quantity,
                price=product.price
            )

            total_amount += product.price * item.quantity

        order.total_amount = total_amount
        order.save()

        cart_items.delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
