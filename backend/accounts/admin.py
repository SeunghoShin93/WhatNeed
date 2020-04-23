from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'age', 'phone', 'birth_year', 'encoding_path',)

@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'time',)

@admin.register(models.Order_list)
class OrderListAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'food_id', 'count',)