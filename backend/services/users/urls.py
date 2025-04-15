from .views import UserListCreateAPIView, UserRetrieveUpdateDestroyAPIView
from django.urls import path


urlpatterns = [
    path('self/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-self'),
    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
]