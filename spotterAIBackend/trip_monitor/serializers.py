from rest_framework import serializers
from .models import Trip, ELDLog


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ['current_location_latitude',
        'current_location_longitude',
        'pickup_location_latitude',
        'pickup_location_longitude',
        'dropoff_location_latitude',
        'dropoff_location_longitude',
        'current_cycle_hours']


class ELDLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ELDLog
        fields = ['id', 'trip', 'date', 'log_data']
