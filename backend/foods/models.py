from django.db import models
from django.conf import settings

# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=255)
    img_path = models.TextField()
    category = models.CharField(max_length=255)
    price = models.IntegerField()

    