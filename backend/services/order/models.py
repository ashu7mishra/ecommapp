from django.db import models
from ..users.models import User
from ..address.models import Address

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    address = models.ForeignKey(Address, on_delete=models.DO_NOTHING)
    status = models.CharField(max_length=250)