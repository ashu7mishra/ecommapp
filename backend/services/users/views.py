from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

User = get_user_model()

class UserListCreateAPIView(ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=user.id)
    
    def perform_create(self, serializer):
        serializer.save()
        
        
class UserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user_id = self.kwargs.get('id')
        if user_id:
            try:
                # Retrieve user by ID from the URL
                return User.objects.get(id=user_id)
            except User.DoesNotExist:
                raise NotFound(detail="User not found")
            # Return the current authenticated user
        return self.request.user
    
    def delete(self, request, *args, **kwargs):
        
        confirm = request.data.get('confirm', False)
        
        if not confirm:
            raise ValidationError({"detail": "Please confirm account deletion by setting 'confirm': true."})
        
        self.request.user.delete()
        return Response({"detail": "Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    