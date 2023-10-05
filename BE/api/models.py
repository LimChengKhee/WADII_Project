from django.db import models
from django.contrib.auth.models import User

# Create your models here.



class Flight(models.Model):
    flightNo = models.CharField(max_length=100)
    flightType =  models.CharField(max_length=100)
    username = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    flight_id = models.CharField(max_length=100,unique=True)
    startdate = models.DateField(blank=False)
    enddate = models.DateField(blank=False)

    def __str__(self) -> str:
        return self.flightNo + self.flightType + self.username
    

