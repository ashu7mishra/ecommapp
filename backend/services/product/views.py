from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Product
from .serializers import ProductSerializer
from ..permissions import IsAdminOrReadOnly
from rest_framework.views import APIView
from ..category.models import Category
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache

class ProductListCreateAPIView(ListCreateAPIView):
    products = cache.get('all_products')
    if not products:
        queryset = Product.objects.all()
        cache.set('all_products', products, timeout=300)  # Cache for 5 minutes
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]


class ProductRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]
    
    
class ProductsByCategoryView(APIView):
    def get(self, request, category_id):
        try:
            category = Category.objects.get(id=category_id)
            products = Product.objects.filter(category=category)
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Category.DoesNotExist:
            return Response({"detail": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
        