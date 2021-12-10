from rest_framework import serializers
from .models import *


class BookingSerializer(serializers.ModelSerializer):

    # def validate(self, attrs):
    #     pass

    class Meta:
        model = Booking
        fields = '__all__'


# class BookingCreateSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = Booking
#         fields = '__all__'

    # def create(self, validated_data):
    #
    #     booking, _ = Booking.objects.create(
    #         date_start=validated_data.get('date_start', None),
    #         date_end=validated_data.get('date_end', None),
    #         parking_space_id=validated_data.get('parking_space_id', None)
    #     )
    #     return booking


class ParkingSpaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParkingSpace
        fields = '__all__'
