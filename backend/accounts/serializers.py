from rest_framework import serializers
from django.contrib.auth import get_user_model
from . import models

class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('name', 'gender', 'birth_year', 'img_path',)

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ('user', 'time')

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order_list
        fields = ('order', 'food', 'count')