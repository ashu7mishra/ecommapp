from django.db import models
from django.contrib.auth import get_user_model
from ..product.models import Product
from ..address.models import Address  # ✅ Import Address model

User = get_user_model()

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)  # ✅ Address field
    payment_method = models.CharField(max_length=50, default='COD')  # ✅ Payment method field
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # ✅ Total amount field
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('confirm', 'Confirm'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ], default='pending')

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"
