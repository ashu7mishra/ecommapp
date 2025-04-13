from django.db import models

# Create your models here.

class NotificationLog(models.Model):
    recipient = models.CharField(max_length=250)
    subject = models.CharField(max_length=250)
    message = models.TextField()
    status = models.CharField(max_length=250)