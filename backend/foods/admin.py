from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'img_path', 'category', 'price',)
