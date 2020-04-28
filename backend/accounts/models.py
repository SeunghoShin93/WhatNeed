from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser
from django.conf import settings
from foods.models import Food, Coffee
# Create your models here.

class User(AbstractUser):
    key = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    phone = models.CharField(max_length=255)
    birth_year = models.IntegerField(null=True)
    encoding_path = models.TextField(null=True)

class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

class Order_list(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    coffee = models.ForeignKey(Coffee, on_delete=models.CASCADE)
    count = models.IntegerField()

class Test(models.Model):
    Binary = models.BinaryField()
    Text = models.TextField()
