from rest_framework import serializers
from .models import Order, OrderItem
from django.contrib.auth import get_user_model
from ..product.models import Product


User = get_user_model()


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='Product.name')
    
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']
    
    
class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'total_amount', 'status', 'created_at', 'updated_at', 'items']
        read_only_fields = ['user', 'total_amount', 'status', 'created_at', 'updated_at']
        