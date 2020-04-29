from django.urls import path
from . import views
#from drf_yasg.views import get_schema_view
#from drf_yasg import openapi
#from rest_framework import permissions

app_name='accounts'
# print('urls.py!')
urlpatterns = [
    path('', views.main, name='main'),
    path('face_detection/', views.face_detection, name='face_detection'),
    path('getItem/', views.user_info, name='user_info'),
    path('addOrderInfo/', views.buy_coffee, name='buy_coffee'),
    path('recent_food/', views.recent_food, name='recent_food'),
]