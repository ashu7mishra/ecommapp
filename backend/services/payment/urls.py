from django.urls import path
from .views import PaymentCreateAPIView, CreateRazorpayOrderView


urlpatterns = [
    path('create-razorpay-order/', CreateRazorpayOrderView.as_view(), name='create-razorpay-order')
    path('create/', PaymentCreateAPIView.as_view(), name='payment-create')
]
