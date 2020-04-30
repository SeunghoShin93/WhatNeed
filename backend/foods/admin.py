from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Coffee)
class CoffeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'img_path', 'category', 'price',)
