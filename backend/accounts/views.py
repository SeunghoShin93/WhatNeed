from .models import User, Order, Order_list
from . import face, recommend
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
import os
import json
import django.conf
from foods.models import Coffee
from django.views.decorators.csrf import csrf_exempt
from PIL import Image
from django.core import serializers
from datetime import datetime
from django.shortcuts import render

def index(request):
    print(os.path.realpath(__file__))
    return render(request, 'frontend/build/index.html')

@csrf_exempt
def face_detection(request):
    
    image = Image.open(request.FILES['imgSrc'])
    image = image.convert("RGB")
    image.save('temp.jpg')
    
    img_path = './temp.jpg'
    load_list = face.load_list()
    res = face.face_count(img_path)
    
    return_list = []
    if res == 1:
        return_list = face.face_detect(img_path, load_list) if res == 1 else []
    else:
        return []
    
    user_list = []

    for r in return_list:
        user = User.objects.filter(key=r).first()
        if user:
            user_list.append(user)
    
    user = user_list[0]
    user_list = serializers.serialize('json', user_list)
    
    return HttpResponse(user_list, content_type="text/json-comment-filtered")


    
@csrf_exempt
def user_info(request):

    user_pk = request.POST.get('pk')
    user = User.objects.filter(pk=user_pk).first()
    
    user_order = Order.objects.filter(user=user) # all of this user's order
    
    favorite_coffees = {}
    for order_list in Order_list.objects.filter(order__in= Order.objects.filter(user=user)):
        favorite_coffees[order_list.coffee.id] = favorite_coffees.get(order_list.coffee.id, 0) + order_list.count
        
    favorite_coffees = sorted([[coffee, count] for coffee, count in favorite_coffees.items()], key=lambda x: x[1], reverse=True)[0:5]
    favorite = []
    for coffee in favorite_coffees:
      tmp = {}
      tmp_coffee = Coffee.objects.filter(pk=coffee[0]).first()
      tmp['id'] = tmp_coffee.id
      tmp['name'] = tmp_coffee.name
      tmp['price'] = tmp_coffee.price
      tmp['count'] = coffee[1]
      favorite.append(tmp)
    
    recent_coffees = {}
    
    recent_orders = Order.objects.filter(user=user).order_by('-time')[0:4]

    for order in recent_orders:
        for o in Order_list.objects.filter(order=order):
            if len(recent_coffees) < 4:
              if not recent_coffees.get(o.coffee.id) and len(recent_coffees) < 4:
                recent_coffees[o.coffee.id] = order.time.strftime("%Y/%m/%d")
    recent = []
    for key, value in recent_coffees.items():
        tmp = {}
        tmp_coffee = Coffee.objects.filter(pk=key).first()
        tmp['id'] = tmp_coffee.id
        tmp['name'] = tmp_coffee.name
        tmp['price'] = tmp_coffee.price
        tmp['date'] = value
        recent.append(tmp)
        
    recommend_coffees = [idx+1 for idx, data in recommend.recommend_list_django(user)][0:4] # only id
    recommend_list = []
    for coffee in recommend_coffees:
        tmp = {}
        tmp_coffee = Coffee.objects.filter(pk=coffee).first()
        tmp['id'] = tmp_coffee.id
        tmp['name'] = tmp_coffee.name
        tmp['price'] = tmp_coffee.price
        recommend_list.append(tmp)
        
    
    
    context = {
      'recent': recent,
      'favorite' : favorite,
      'recommend': recommend_list
    }
    
    context = json.dumps(context, ensure_ascii=False)

    return HttpResponse(context, content_type='application/json')


@csrf_exempt
def buy_coffee(request):
    buy_info = request.body.decode('UTF-8')
    buy_json = json.loads(buy_info)

    
    order = Order()
    order.user_id = buy_json['user_id']
    order.save()
    menu_info = buy_json['menu_info']
    if not menu_info:
        return HttpResponseBadRequest()
    for info in menu_info:
        order_list = Order_list()
        order_list.coffee_id = info['menu_id']
        order_list.count = info['count']
        order_list.order = order
        order_list.save()
    return HttpResponse('order complete')
    '''
    menus = request.body.menu
    order.user = User.fobjects.filter(user=request.body.user).first()
    order.save()
    for menu, cnt in menus: 
      order_list = Order_list()
      order_list.count = count
      order_list.coffee = menu
      order_list.order = order
      order_list.save()
    '''
