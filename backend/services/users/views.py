from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.response import Response
from rest_framework import status
import logging

User = get_user_model()

# Get logger
logger = logging.getLogger('notifications')  # Assuming this is your configured logger in settings.py

class UserListCreateAPIView(ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff or user.is_superuser:
            return User.objects.all()
        return User.objects.filter(id=user.id)
    
    def perform_create(self, serializer):
        user = serializer.save()
        logger.info(f"New user registered: {user.username} (ID: {user.id})")

class UserRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        user_id = self.kwargs.get('id')
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                return user
            except User.DoesNotExist:
                logger.warning(f"User fetch failed: No user with ID {user_id}")
                raise NotFound(detail="User not found")
        return self.request.user
    
    def delete(self, request, *args, **kwargs):
        confirm = request.data.get('confirm', False)

        if not confirm:
            logger.warning(f"User deletion attempt without confirmation by user ID {request.user.id}")
            raise ValidationError({"detail": "Please confirm account deletion by setting 'confirm': true."})

        user = self.request.user
        username = user.username
        user_id = user.id
        user.delete()
        logger.info(f"User deleted: {username} (ID: {user_id})")

        return Response({"detail": "Account deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
