from rest_framework import serializers
from .models import User
from services.address.serializers import AddressSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=False, required=False)
    password = serializers.CharField(write_only = True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'addresses', 'password']
        read_only_fields = ['id']
        
    def create(self, validated_data):
        address_data = validated_data.pop('addresses', [])
        user = User.objects.create_user(**validated_data)
        
        for address in address_data:
            user.addresses.create(**address)
            
        return user
    
    def update(self, instance, validated_data):
        address_data = validated_data.pop('addresses', [])
        password = validated_data.pop('password', None)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        if password:
            instance.set_password(password)
            
        instance.save()
        
        if address_data:
            instance.addresses.all().delete()
            for address in address_data:
                instance.addresses.create(**address)
                
        return instance