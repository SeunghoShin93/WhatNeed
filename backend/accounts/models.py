from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from foods.models import Food
# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    age = models.IntegerField(null=True)
    phone = models.CharField(max_length=255)
    birth_year = models.IntegerField()
    encoding_path = models.TextField(null=True)

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

class Order_list(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    count = models.IntegerField()
