from django.db import models
from ..product.models import Product

# Create your models here.
class Inventory(models.Model):
    product = models.OneToOneField(Product, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()
    threshold = models.IntegerField()
