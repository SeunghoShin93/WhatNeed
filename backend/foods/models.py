from django.db import models
from django.conf import settings

# Create your models here.
class Food(models.Model):
    name = models.CharField(max_length=255)
    img_path = models.TextField()
    category = models.CharField(max_length=255)
    price = models.IntegerField()



def coffee_path(category, name):
    return 'coffee/{}/{}'.format(category, name)

class Coffee(models.Model):
    name = models.CharField(max_length=255)
    name_eng = models.CharField(max_length=255)
    img_path = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=255)
    category_eng = models.CharField(max_length=255)
    image = models.ImageField()
    price = models.IntegerField()
