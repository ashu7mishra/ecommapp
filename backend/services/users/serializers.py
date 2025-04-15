from rest_framework import serializers
from .models import User
from services.address.serializers import AddressSerializer


class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'addresses']