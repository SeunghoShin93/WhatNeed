from django.shortcuts import render, get_object_or_404
from foods.models import Food
from .models import User, Order, Order_list
from . import face
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import AccountsSerializer, OrderListSerializer, OrderSerializer
from drf_yasg.views import get_schema_view
from .forms import OrderForm, OrderListForm
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
import os

# Create your views here.
def main(request):
    foods = Food.objects.all()
    context = {'foods': foods}
    return render(request, 'accounts/main.html', context)

def camera(request):
    print('hello')
    os.system('python accounts/face.py')
    return render(request, 'accounts/camera.html')

def select_food(request, foods, user_pk):
    order = OrderForm()
    user = User.objects.filter(pk=user_pk)
    # select * from User where pk = user_pk
    order.user = user
    if order.is_valid():
        order.save()
        for food in foods:
            order_list = OrderListForm()
            order_list.order = order
            order_list.food = food[0]
            order_list.count = food[1]
            if order_list.is_valid():
                order_list.save()
            else:
                return HttpResponseBadRequest
    else:
        return HttpResponseBadRequest

def recent_food(request, user_pk):
    user = User.objects.filter(pk=user_pk)
    order = Order.objects.filter(user=user)
    
    




        



# @api_view
# def user_detail(request, user_pk):
#     pass