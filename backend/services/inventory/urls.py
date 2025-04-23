from django.urls import path
from .views import InventoryListCreateAPIView, InventoryRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', InventoryListCreateAPIView.as_view(), name='inventory-list-create'),
    path('<int:pk>/', InventoryRetrieveUpdateDestroyAPIView.as_view(), name='inventory-details'),
]
