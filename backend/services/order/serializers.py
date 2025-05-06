from rest_framework import serializers
from .models import Order, OrderItem
from django.contrib.auth import get_user_model
from ..product.models import Product
from ..address.models import Address  # Import address model
from ..address.serializers import AddressSerializer  # Use nested serializer

User = get_user_model()

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')  # corrected source

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    address = AddressSerializer(read_only=True)  # Nested address data

    class Meta:
        model = Order
        fields = ['id', 'user', 'address', 'total_amount', 'status', 'created_at', 'updated_at', 'items']
        read_only_fields = ['user', 'address', 'total_amount', 'status', 'created_at', 'updated_at']
