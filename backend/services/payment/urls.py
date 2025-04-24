from django.urls import path
from .views import PaymentCreateAPIView


urlpatterns = [
    path('', PaymentCreateAPIView.as_view(), name='payment-create')
]
