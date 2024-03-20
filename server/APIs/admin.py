from django.contrib import admin

from simple_history.admin import SimpleHistoryAdmin
from import_export.admin import ImportExportMixin, ExportMixin

from .models import *

# Register your models here.

admin.site.site_header = "GPS Tracking System"

class BusLocationAdmin(ImportExportMixin, SimpleHistoryAdmin):
    list_display = ('bus_id', 'latitude', 'longitude', 'timestamp')
    list_filter = ('bus_id',)
    search_fields = ('bus_id',  'timestamp')
    ordering = ('bus_id', 'timestamp')

admin.site.register(BusLocation, BusLocationAdmin)

class BusAdmin(ImportExportMixin, SimpleHistoryAdmin):
    list_display = ('id', 'name')
    search_fields = ('id', 'name')
    ordering = ('id',)

admin.site.register(Bus, BusAdmin)

class ScheduleAdmin(ImportExportMixin, SimpleHistoryAdmin):
    list_display = ('day_id', 'bus_id', 'from_location', 'to_location', 'start_time', 'end_time')
    list_filter = ('bus_id', 'from_location', 'to_location')
    search_fields = ('bus_id', 'from_location', 'to_location')
    ordering = ('bus_id', 'start_time', 'end_time')

admin.site.register(Schedule, ScheduleAdmin)

