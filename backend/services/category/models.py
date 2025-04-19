from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey("self", null=True, blank=True, related_name='subcategories', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name if not self.parent else f"{self.parent} > {self.name}"
    