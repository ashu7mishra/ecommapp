from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=100, null=False)
    email = models.EmailField(max_length=100, null=False)
    is_varified = models.BooleanField(default=False)
