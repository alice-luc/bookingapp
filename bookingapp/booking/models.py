from datetime import timedelta

from django.db import models
from django.utils.timezone import now


class ParkingSpace(models.Model):

    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Parking Space'
        verbose_name_plural = 'Parking Spaces'


class Booking(models.Model):

    parking_space = models.ForeignKey(ParkingSpace, on_delete=models.CASCADE)
    date_start = models.DateTimeField(default=now())
    date_end = models.DateTimeField(default=now()+timedelta(hours=4))
