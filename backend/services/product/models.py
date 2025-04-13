from django.db import models
from ..category.models import Category

# Create your models here.

class Product(models.Model):
    name = models.CharField(max_length=250)
    description = models.TextField()
    price = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.DO_NOTHING)
    stock = models.IntegerField()