from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AddressSerializer
from .models import Address

class AddressListCreateAPIView(ListCreateAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        user = self.request.user
        # Check if this is the first address
        is_first = not Address.objects.filter(user=user).exists()
        serializer.save(user=user, is_default=is_first)

class AddressRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Address.objects.filter(user=self.request.user)

class DefaultAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            address = Address.objects.get(user=request.user, is_default=True)
            serializer = AddressSerializer(address)
            return Response(serializer.data)
        except Address.DoesNotExist:
            return Response({'detail': 'No default address found'}, status=status.HTTP_404_NOT_FOUND)
