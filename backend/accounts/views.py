from django.shortcuts import render
from foods.models import Food

# Create your views here.
def main(request):
    foods = Food.objects.all()
    context = {'foods': foods}
    return render(request, 'accounts/main.html', context)