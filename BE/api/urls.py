
from django.urls import path
# from .views import flight_list,flights_detail
from . import views
# from django.conf.urls import url
urlpatterns = [

# path('tutorials/', views.tutorial_list),
# path('tutorials/<int:pk>', views.tutorial_detail),
# path('tutorials/published/', views.tutorial_list_published),

path('flight/', views.flight_list),
path('flight/<str:username>/<str:flight_id>/', views.flights_detail),


]
