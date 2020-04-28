from django import forms
from .models import Order, Order_list
from foods.models import Food

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ('user',)

class OrderListForm(forms.ModelForm):
    class Meta:
        model = Order_list
        fields = ('order', 'coffee', 'count')

class UploadFileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file = forms.FileField()       