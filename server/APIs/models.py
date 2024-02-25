from django.db import models
from simple_history.models import HistoricalRecords

class Bus(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=300, blank=False, null=False)

    def __str__(self):
        return self.name

class BusLocation(models.Model):
    id = models.AutoField(primary_key=True)
    bus_id = models.ForeignKey(Bus, on_delete=models.CASCADE)
    latitude = models.FloatField(help_text="Latitude of the bus")
    longitude = models.FloatField(help_text="Longitude of the bus")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.bus_id.name} - {str(self.timestamp)}"

