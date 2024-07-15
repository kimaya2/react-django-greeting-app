# greetings/urls.py
from django.urls import path
from .views import greet, names

urlpatterns = [
    path('greet/', greet, name='greet'),
    path('names/', names, name='names'),
]
