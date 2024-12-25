# from rest_framework.generics import GenericAPIView
import base64

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ecommapp.models import Product
from ecommapp.serializers.product_serializer import ProductSerializer


class ProductAPIView(APIView):

    def get(self, request):
        products = Product.objects.all()
        serialized = ProductSerializer(products, many=True)
        return Response(serialized.data, status=200)

    def post(self, request):
        data = request.data
        decoded_data = ProductSerializer(data=data)
        if not decoded_data.is_valid():
            return Response(decoded_data.errors, status=400)
        decoded_data.save()
        return Response(decoded_data.data, status=201)
