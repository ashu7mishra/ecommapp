from rest_framework import serializers
from .models import User
from services.address.serializers import AddressSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only = True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'addresses', 'password']
        read_only_fields = ['id']
        
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)