from django.db import models

# Create your models here.


class Trip(models.Model):
    current_location_latitude = models.FloatField(default=0.0)
    current_location_longitude = models.FloatField(default=0.0)
    pickup_location_latitude = models.FloatField(default=0.0)
    pickup_location_longitude = models.FloatField(default=0.0)
    dropoff_location_latitude = models.FloatField(default=0.0)
    dropoff_location_longitude = models.FloatField(default=0.0)
    current_cycle_hours = models.FloatField(default=0.0)

    # def __str__(self):
    #     return f"Trip from {self.pickup_location} to {self.dropoff_location}"

class Stop(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="stops")
    location = models.CharField(max_length=255)
    reason = models.CharField(max_length=255)  # "Fuel Stop" or "Rest Break"

class ELDLog(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="eld_logs")
    date = models.DateField()
    log_data = models.JSONField()  # Stores log status changes