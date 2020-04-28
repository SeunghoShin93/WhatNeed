from django import forms
from .models import Coffee

class CoffeeForm(forms.ModelForm):
    class Meta:
        model = Coffee
        fields = ('name', 'name_eng', 'image', 'img_path', 'category', 'category_eng', 'price',)