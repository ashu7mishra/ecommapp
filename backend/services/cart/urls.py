from django.urls import path
from .views import CartDetailView, CartItemAddView, CartItemRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', CartDetailView.as_view(), name='cart-detail'),
    path('items/', CartItemAddView.as_view(), name='cart-item-add'),
    path('items/<int:pk>/', CartItemRetrieveUpdateDestroyAPIView.as_view(), name='cart-item-add-delete'),
]
