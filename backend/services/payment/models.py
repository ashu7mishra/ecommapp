from django.db import models
from ..order.models import Order

# Create your models here.

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.DO_NOTHING)
    payment_id = models.CharField(max_length=256)
    status = models.CharField(max_length=250)
