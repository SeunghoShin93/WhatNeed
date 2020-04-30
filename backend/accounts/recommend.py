import pymysql
import calendar
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from .models import User, Order, Order_list
from foods.models import Coffee

def recommend_list_django(target_user):
    #print('target_user_pk : ', target_user.pk)
    all_coffee_length = len(Coffee.objects.all())
    all_user_key = [user.key for user in User.objects.all()]
    user_order = Order.objects.filter(user=target_user).order_by('-time')
    target_order = user_order[0]
    for order in user_order:
        if Order_list.objects.filter(order=order):
            target_order = order
    user_coffee = Order_list.objects.filter(order=target_order)
    target_coffee_id = user_coffee.first().coffee.id
    
    pandas_input_list = []
    for key in all_user_key:
        user_pk = User.objects.filter(key=key).first().id
        coffee_cnt = [0] * all_coffee_length
        result = [(order_list.coffee_id, order_list.count) for order_list in Order_list.objects.all() \
            if order_list.order_id in [order.pk for order in Order.objects.filter(user_id=user_pk).order_by('-time')]]
        if len(result) > 50: result = result[0:50]
        
        for coffee_id, count in result:
            coffee_cnt[coffee_id-1] += count
        pandas_input_list.append(coffee_cnt)

    df = pd.DataFrame(pandas_input_list, index=all_user_key, columns=[str(i) for i in range(0, all_coffee_length)])
    df = df.transpose()
    item_base_collaber = cosine_similarity(df)

    ans_list = []
    for idx, data in enumerate(item_base_collaber[target_coffee_id-1]):
        if idx == target_coffee_id:
            continue
        ans_list.append([idx, data])

    ans_list = sorted(ans_list, key= lambda data: data[1], reverse=True)[:5]

    return ans_list

