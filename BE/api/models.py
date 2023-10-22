from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Itinerary(models.Model):
    itinerary_data = models.TextField()
    username = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    itinerary_name = models.CharField(max_length=255,unique=True )

    def __str__(self) -> str:
        return self.name
    

