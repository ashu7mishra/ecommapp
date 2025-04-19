from django.urls import path
from .views import ProductListCreateAPIView, ProductRetrieveUpdateDestroyAPIView, ProductsByCategoryView


urlpatterns = [
    path('', ProductListCreateAPIView.as_view(), name='product-list'),
    path('<int:pk>/', ProductRetrieveUpdateDestroyAPIView.as_view(), name='product-detail'),
    path('category/<int:category_id>/', ProductsByCategoryView.as_view(), name='product-by-category'),
]
