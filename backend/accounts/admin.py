from django.contrib import admin
from . import models
from django.conf import settings
# Register your models here.

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('key', 'username', 'gender', 'phone', 'birth_year', 'encoding_path',)

@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'time',)

@admin.register(models.Order_list)
class OrderListAdmin(admin.ModelAdmin):
    list_display = ('order', 'coffee', 'count',)