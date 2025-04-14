from django.db import models
from django.contrib.auth.models import AbstractUser
from shared.abstract_models import *

# Create your models here.

class User(AbstractUser, DateTimeStampModel):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    
    def __str__(self):
        return self.username