import pymysql
from . import face
import calendar
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def pick_food(rand, food_list ,food_sum_prop):
    for idx, sum_prop in enumerate(food_sum_prop):
        if rand <= sum_prop:
            return food_list[idx]
    return int(np.random.randint(30, size=1)[0])

def save_order(user_id, food_list, food_prop):
    connect = pymysql.connect(host = '52.79.161.164', user='root', password='ssafy', db = 'project', charset = 'utf8')
    cur = connect.cursor()
    food_sum_prop = []
    food_sum_prop.append(0)
    for prop in food_prop:
        food_sum_prop.append( food_sum_prop[-1] + prop)
    food_sum_prop = food_sum_prop[1:]
    np_props = np.random.rand(len(food_list))
    time_str = '2020-{:02}-{:02} 12:00:00'
    for month in range(1, 4):
        day_max = calendar.monthrange(2020, month)[1]
        for day in range(1, day_max+1):
            food = pick_food(np.random.rand(1)[0], food_list, food_sum_prop)
            print(food ,time_str.format(month,day))
            sql = "insert into `order`(user_id, time) values(%s, %s)"
            cur.execute(sql, (user_id, time_str.format(month,day)))
            connect.commit()
            sql = "select LAST_INSERT_ID()"
            cur.execute(sql)
            last_id = cur.fetchall()
            last_id = last_id[0][0]
            sql = "insert into `order_list` (order_id, food_id, count) values(%s, %s, %s)"
            cur.execute(sql, (last_id, food, 1))
            connect.commit()
            #print(last_id)

    connect.close()

'''
connect = pymysql.connect(host = '52.79.161.164', user='root', password='ssafy', db = 'project', charset = 'utf8')
cur = connect.cursor()

sql = 'select * from user'
cur.execute(sql)

print(cur.fetchall())


sql = 'select * from user where name like "%은%"'
cur.execute(sql)

print(cur.fetchall())

connect.close()
'''
# 원하는 user_id
def recommend_list(target_user_id):
    # usr_id, food, count
    user_list = []
    connect = pymysql.connect(host = '52.79.161.164', user='root', password='ssafy', db = 'project', charset = 'utf8')
    cur = connect.cursor()

    sql = 'select food_id from `order` join order_list on order.id = order_list.order_id where order.user_id = %s order by `time` desc limit 1'
    #target_user_id가 최근 먹은 음식 id값을 구하는부분.

    cur.execute(sql, (target_user_id))
    target_food_id = cur.fetchall()[0][0] #((food_id, ), ) # 최근에 먹었던 음식
    #print(target_food_id)

    sql = 'select id from user'
    cur.execute(sql)

    sql_res = cur.fetchall()
    for user in sql_res:
        user_list.append(user[0])

    pandas_input_list = []
    for user_id in user_list:
        sql = 'select food_id, count from order_list where order_id in ( \
                select * from(  \
                (select id from `order` where user_id = %s  order by time limit 50) as  tmp  ))'
        
        cur.execute(sql, (user_id))
        sql_res = cur.fetchall()
        food_cnt = [0] * 30 #food_id.length == 30
        for food_id, count in sql_res:
            food_cnt[food_id] += count
        pandas_input_list.append(food_cnt)
        
    connect.close()
    
    #print(user_list)
        #     food_id1  food_id2.....
    #id
    #id
    #id 
    #
    df = pd.DataFrame(pandas_input_list, index=user_list,columns=[str(i) for i in  range(0, 30) ])
    #print(df)
    df = df.transpose()
    #print(df)
    item_base_collaber = cosine_similarity(df) 
    #print(type(item_base_collaber))
    #print(item_base_collaber[0])

    ans_list = [] # [음식id, 코사인 유사도]
    for idx, data in enumerate(item_base_collaber[target_food_id]):
        if idx == target_food_id: # 자기 자신 빼고
            continue
        ans_list.append([idx, data])
    ans_list = sorted(ans_list, key= lambda data: data[1], reverse=True)[:5] # 앞에서 5개 return

    #print(sort(item_base_collaber.sort_values(ascending=False)[:6])
    return ans_list

def insert_dump():
    connect = pymysql.connect(host = '52.79.161.164', user='root', password='ssafy', db = 'project', charset = 'utf8')
    cur = connect.cursor()

    sql = 'select id from user'
    cur.execute(sql)

    user_list = cur.fetchall()
    connect.close()

    # food_list : user_id
    food_lists = [
    [ 0,  2 , 3 , 6, 8, 10, 13],
    [ 10,  17,  18,  19,  21,  22, 25, 26],
    [  4,  7,  9, 15, 16, 17, 20, 22],
    [ 7,21,25,28,29],
    [  0,  1, 8,  9,  16, 18 ,19, 21, 28 ,29],
    [ 10,11,12,13,14,15,16,25],
    ]
    # 확률 (합이 0 ~ 1 사이)
    prop_lists = [
    [.1, .2 ,.1 ,.2,.05,.15,.1],
    [.05, .05, .05, .05, .05, .05, .2, .2],
    [ .1, .1, .1, .1, .1, .1, .1, .1],
    [.15,.1,.15,.15,.15],
    [ .1, .1,.05,.05,.05,.05,.05,.05, .1, .1],
    [ .1,.1,.1,.1,.1,.1,.1,.1],
    ]


    for user in zip(user_list, food_lists, prop_lists):
        user_id = user[0][0]
        save_order(user_id, user[1], user[2])
        print(user_id, "save dump order")

#print(type(int(np.random.randint(30, size=1)[0])))
#insert_dump()
# print(recommend_list('20200422115158021'))
