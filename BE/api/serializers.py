from rest_framework import serializers
from .models import User,Flight


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ('__all__')