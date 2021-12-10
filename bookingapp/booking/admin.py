from django.contrib import admin
from .models import *
# Register your models here.


class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'parking_space', 'date_start', 'date_end')
    list_display_links = ('parking_space',)
    search_fields = ('id',  'date_start', 'date_end')
    list_editable = ('date_start', 'date_end')
    list_filter = ('date_start', 'date_end')


admin.site.register(Booking, BookingAdmin)
admin.site.register(ParkingSpace)