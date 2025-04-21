from django.shortcuts import render
from rest_framework import generics, status, response, permissions
from .serializers import CartSerializer, CartItemSerializer
from .models import Cart, CartItem


class CartDetailView(generics.RetrieveAPIView):
    serializer_class = CartSerializer
    permission_class = [permissions.IsAuthenticated]
    
    def get_object(self):
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return cart
    
class CartItemAddView(generics.CreateAPIView):
    serializer_class = CartItemSerializer
    permission_class = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        cart, created_at = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)
    
class CartItemRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CartItemSerializer
    permission_class = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        cart, created_at = Cart.objects.get_or_create(user=self.request.user)
        return CartItem.objects.filter(cart=cart)
    
