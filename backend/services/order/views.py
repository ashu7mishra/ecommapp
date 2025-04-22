from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import Order, OrderItem
from .serializers import OrderItemSerializer, OrderSerializer
from ..cart.models import CartItem


class OrderListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        user = self.request.user
        cart_items = CartItem.objects.filter(user=user)
        
        if not cart_items.exists():
            raise serializer.ValidationError('Cart is Empty')
        
        order = serializer.save(user=user, total_amount=0)
        total_amount = 0
        
        for item in cart_items:
            price = item.product.price
            OrderItem.objects.create(
                order = order,
                product = item.product,
                quantity = item.quantity,
                price = price
            )
            total_amount += price*item.quantity
            item.delete()
            
        order.total_amount = total_amount
        order.save()
