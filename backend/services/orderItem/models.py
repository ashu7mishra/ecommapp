from django.db import models
from ..order.models import Order
from ..product.models import Product

# Create your models here.

class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity = models.CharField(max_length=250)
    price = models.IntegerField()