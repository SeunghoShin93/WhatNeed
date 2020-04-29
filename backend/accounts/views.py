from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login as auth_login, logout as auth_logout
from foods.models import Food
from .models import User, Order, Order_list
from . import face1 as face
from . import recommend1 as recommend
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
import os
import json
import django.conf
import matplotlib.pyplot as plt
import base64
from foods.models import Coffee
import random
from django.contrib import messages 
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from django.core import serializers
from itertools import chain
from django.utils.safestring import mark_safe
from datetime import datetime

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

    for r in return_list:
        user = User.objects.filter(key=r).first()
        if user:
            user_list.append(user)
    
    user = user_list[0]
    user_list = serializers.serialize('json', user_list)
    
    #print(recommend.recommed_list_django(user))

    
    #print(type(user_list))
    return HttpResponse(user_list, content_type="text/json-comment-filtered")


    
@csrf_exempt
def user_info(request):
    print('request_body : ',request.body)
    #print('request)
    print('request_post :', request.POST.get('pk'))
    user_pk = request.POST.get('pk')
    user = User.objects.filter(pk=user_pk).first()
    
    all_coffees = Coffee.objects.all()
    recent_coffees = {}
    #favorite_coffees = sorted([])
    recent_orders = Order.objects.filter(user=user).order_by('-time')[0:4] # orders (not order_list)
    
    print(recent_coffees)
    for order in recent_orders:
        for o in Order_list.objects.filter(order=order):
            if len(recent_coffees) < 4 or len(favorite_coffees) < 4:
              if not recent_coffees.get(o.coffee.name) and len(recent_coffees) < 4:
                recent_coffees[o.coffee.name] = order.time.strftime("%Y/%m/%d")
                #print(order)
              #favorite_coffees[o.coffee.name] = favorite_coffees.get(o.coffee.name, 0) + o.count
    
    print(recent_coffees)
    #recent_coffees = serializers.serialize('json', recent_coffees, ensure_ascii=False) # id time
    #favorite_coffees = serializer.serialize('json', favorite_coffees, ensure_ascii=False) 
    recommend_coffees = [idx for idx, data in recommend.recommend_list_django(user)][0:2] # only id
    
    context = {
      'recent_coffees': recent_coffees,
      'favortite_coffees' : favorite_coffees,
      'recommend_coffees': recommend_coffees
    }
    
    context = json.dumps(context, ensure_ascii=False)

    return HttpResponse(context, content_type='application/json')

def recent_food(request, user_pk):
    user = User.objects.filter(pk=user_pk).first()
    # order = Order.objects.filter(user=user)
    recent_foods = Order.objects.filter(user_id=user)[0:3]
    context = {'recent_foods': recent_foods}
    return render(request, 'accounts/recent_food.html', context)

@csrf_exempt
def buy_coffee(request):
    print(request)
    print(request.body)
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

