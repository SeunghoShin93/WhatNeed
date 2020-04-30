from django import forms
from .models import Order, Order_list

class OrderForm(forms.ModelForm):
    class Meta:
        model = Order
        fields = ('user',)

class OrderListForm(forms.ModelForm):
    class Meta:
        model = Order_list
        fields = ('order', 'coffee', 'count')
