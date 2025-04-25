from django.urls import path
from .views.paymentCreateApiView import PaymentCreateAPIView
from .views.createRazorpayOrderView import CreateRazorpayOrderView


urlpatterns = [
    path('create-razorpay-order/', CreateRazorpayOrderView.as_view(), name='create-razorpay-order'),
    path('create/', PaymentCreateAPIView.as_view(), name='payment-create')
]
