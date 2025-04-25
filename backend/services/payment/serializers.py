from rest_framework import serializers
from .models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = [
            "id", "order", "amount", "payment_method", "status", 
            "created_at", "razorpay_order_id", "razorpay_payment_id", "razorpay_signature"
        ]
        read_only_fields = ["user"]
        