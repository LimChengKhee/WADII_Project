from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Flight
from rest_framework import permissions
from django.shortcuts import render
from django.http import JsonResponse
from .serializers import FlightSerializer
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
# @api_view(['GET', 'POST', 'DELETE'])
# def tutorial_list(request):
#     # GET list of tutorials, POST a new tutorial, DELETE all tutorials
#     if request.method == 'GET':
#         tutorials = Tutorial.objects.all()
        
#         title = request.GET.get('title', None)
#         print(title)
#         if title is not None:
#             tutorials = tutorials.filter(title__icontains=title)
        
#         tutorials_serializer = TutorialSerializer(tutorials, many=True)
#         return JsonResponse(tutorials_serializer.data, safe=False)
#         # 'safe=False' for objects serialization
#     elif request.method == 'POST':
#         tutorial_data = JSONParser().parse(request)
#         tutorial_serializer = TutorialSerializer(data=tutorial_data)
#         if tutorial_serializer.is_valid():
#             tutorial_serializer.save()
#             return JsonResponse(tutorial_serializer.data, status=status.HTTP_201_CREATED) 
#         return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
# @api_view(['GET', 'PUT', 'DELETE'])
# def tutorial_detail(request, **kwargs):
#         # find tutorial by pk (id)
#     try: 
#         tutorial = Tutorial.objects.get(pk=kwargs['pk']) 
#     except Tutorial.DoesNotExist: 
#         return JsonResponse({'message': 'The tutorial does not exist'}, status=status.HTTP_404_NOT_FOUND) 

#     if request.method == 'GET': 
#         tutorial_serializer = TutorialSerializer(tutorial) 
#         return JsonResponse(tutorial_serializer.data) 
#     elif request.method == 'PUT':
#         print(request)
#         tutorial_data = JSONParser().parse(request) 
#         tutorial_serializer = TutorialSerializer(tutorial, data=tutorial_data) 
        
#         if tutorial_serializer.is_valid(): 
#             tutorial_serializer.save() 
#             return JsonResponse(tutorial_serializer.data) 
#         return JsonResponse(tutorial_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE': 
#         tutorial.delete() 
#         return JsonResponse({'message': 'Tutorial was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
   
 
#     # GET / PUT / DELETE tutorial
    
        
# @api_view(['GET'])
# def tutorial_list_published(request):
#     # GET all published tutorials
#     tutorials = Tutorial.objects.filter(published=True)
        
#     if request.method == 'GET': 
#         tutorials_serializer = TutorialSerializer(tutorials, many=True)
#         return JsonResponse(tutorials_serializer.data, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def flight_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        flights = Flight.objects.all()
        
        user = request.GET.get('username', None)
        print(user)
        if user is not None:
            flights = flights.filter(username=user)
        
        flights_serializer = FlightSerializer(flights, many=True)
        return JsonResponse(flights_serializer.data, safe=False)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        flights_data = JSONParser().parse(request)
        flights_serializer = FlightSerializer(data=flights_data)
        if flights_serializer.is_valid():
            flights_serializer.save()
            return JsonResponse(flights_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(flights_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET', 'PUT', 'DELETE'])
def flights_detail(request, **kwargs):
        # find tutorial by pk (id)
    try: 
        flight = Flight.objects.get(username=kwargs['username'],flight_id=kwargs['flight_id']) 
    except Flight.DoesNotExist: 
        return JsonResponse({'message': 'The flight id not there does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        flight_serializer = FlightSerializer(flight) 
        return JsonResponse(flight_serializer.data) 
    elif request.method == 'PUT':
        flight_data = JSONParser().parse(request) 
        flight_serializer = FlightSerializer(flight, data=flight_data) 
        
        if flight_serializer.is_valid(): 
            flight_serializer.save() 
            return JsonResponse(flight_serializer.data) 
        return JsonResponse(flight_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE': 
        flight.delete() 
        return JsonResponse({'message': 'Flight was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    
   