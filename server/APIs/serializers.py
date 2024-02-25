from rest_framework import serializers
from .models import *

class BusLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusLocation
        fields = ['bus_id', 'latitude', 'longitude', 'timestamp']


class BusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bus
        fields = ['id', 'name', 'password']



