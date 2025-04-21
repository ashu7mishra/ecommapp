from django.db import models
from ..product.models import Product


class Inventory(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.product.name}: {self.quantity} in stock"
