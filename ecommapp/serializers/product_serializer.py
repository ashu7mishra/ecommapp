from ecommapp.models import Product, DairyProducts
from rest_framework import serializers


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class DairyProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = DairyProducts
        fields = "__all__"