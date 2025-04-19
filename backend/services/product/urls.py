from django.urls import path
from .views import ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product-list'),
    path('', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
]
