
from django.urls import path
# from .views import flight_list,flights_detail
from . import views
# from django.conf.urls import url
urlpatterns = [

# path('tutorials/', views.tutorial_list),
# path('tutorials/<int:pk>', views.tutorial_detail),
# path('tutorials/published/', views.tutorial_list_published),

path('itinerary/', views.itinerary_list),
path('itinerary/<str:username>/<str:itinerary_name>/', views.itinerary_detail),


]
