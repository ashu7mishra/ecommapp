from django.db import models


class DateTimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_At = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True