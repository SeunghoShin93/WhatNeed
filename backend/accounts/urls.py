from django.urls import path
from . import views

app_name='accounts'
# print('urls.py!')
urlpatterns = [
    path('', views.index, name='index'),
    path('face_detection/', views.face_detection, name='face_detection'),
    path('getItem/', views.user_info, name='user_info'),
    path('addOrderInfo/', views.buy_coffee, name='buy_coffee')
]