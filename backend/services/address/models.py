from django.db import models
from ..users.models import User

# Create your models here.
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    street = models.CharField(max_length=250)
    city = models.CharField(max_length=250)
    pincode = models.DecimalField(decimal_places=0, max_digits=10)
    state = models.CharField(max_length=250)
    country = models.CharField(max_length=250)
    is_default = models.BooleanField()
