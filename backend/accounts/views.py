from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login as auth_login, logout as auth_logout
from foods.models import Food
from .models import User, Order, Order_list
from . import face1 as face
from . import recommend1 as recommend
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import AccountsSerializer, OrderListSerializer, OrderSerializer
from drf_yasg.views import get_schema_view
from .forms import OrderForm, OrderListForm
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
import os
import json
import django.conf
import matplotlib.pyplot as plt
import base64
from foods.forms import CoffeeForm
from foods.models import Coffee
import random
from django.contrib import messages 
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from django.core import serializers

def main(request):
    # foods = Food.objects.filter()
    # users = User.objects.filter()
    # context = {'foods': foods, 'us': users}
    # BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    # print(BASE_DIR)
    coffees = Coffee.objects.all()
    # print(coffees)
    form = CoffeeForm()
    context = {'form' : form, 'coffees': coffees}
    return render(request, 'accounts/main.html', context)


def login(request):
    if request.user_is_authenticated:
        return redirect('accounts:main')
    if request.method == 'POST':
        pass
        
    # else:
def add_coffee(request):
    with open('C:/Users/multicampus/Desktop/s02p23b101/backend/accounts/coffee.json', 'r', encoding='utf-8-sig') as f:
        json_data = json.loads(f.read())
        for j in json_data:
            c = Coffee()
            c.name = j['name']
            c.name_eng = j['name_eng']
            c.iamge = j['image']
            c.category = j['category']
            c.category_eng = j['category_eng']
            c.price = j['price']
            c.save()
    return redirect('accounts:main')

def add_people(request):
    with open('C:/Users/multicampus/Desktop/s02p23b101/backend/accounts/user.json', 'r', encoding='utf-8-sig') as f:
        json_data = json.loads(f.read())
        for j in json_data:
            c = User()
            c.username = j['name']
            c.gender = j['gender']
            c.birth_year = j['birth_year']
            c.phone = j['phone']
            c.encoding_path = j['encoding_path']
            c.key = j['id']
            c.save()
    return redirect('accounts:main')

@csrf_exempt
def face_detection(request):
    print('face_detection!')
    image = Image.open(request.FILES['imgSrc'])
    image.save('temp.jpg')
    
    img_path = './temp.jpg'
    load_list = face.load_list()
    res = face.face_count(img_path)
    
    return_list = []
    if res == 1:
        return_list = face.face_detect(img_path, load_list)
    else:
        return []
    
    user_list = []
    # user_list = [User.objects.filter(key=r).first() for r in return_list]
    for r in return_list:
        user = User.objects.filter(key=r).first()
        if user:
            user_list.append(user)
    
    user_list = serializers.serialize('json', user_list)
    print(user_list)
    #print(return_list)
    return HttpResponse(user_list, content_type="text/json-comment-filtered")
    



def recent_food(request, user_pk):
    user = User.objects.filter(pk=user_pk).first()
    # order = Order.objects.filter(user=user)
    recent_foods = Order.objects.filter(user_id=user)[0:3]
    context = {'recent_foods': recent_foods}
    return render(request, 'accounts/recent_food.html', context)


def all_food(request, user_pk):
    all_foods = Food.objects.all()

def save_order(request):
    coffees = Coffee.objects.all()
    users = User.objects.all()
    # orde = random.randint(1, 4)
    print(len(users)) 
    r = random.randint(0, len(users))
    print(r)
    user = users[r]
    random_coffees = [[coffees[random.randint(0, len(coffees))], random.randint(1, 2)] for _ in range(random.randint(1, 3))]
    
    order = Order()
    order.user = user
    # if order.is_valid():
    order.save()
    for coffee in random_coffees:
        order_list = Order_list()
        order_list.order = order
        order_list.coffee = coffee[0]
        order_list.count = coffee[1]
        order_list.save()
    #     else:
    #         print('second valid')
    # else:
    #     print('first valid')
    return redirect('accounts:main')

