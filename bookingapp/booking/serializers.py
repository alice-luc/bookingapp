from rest_framework import serializers

from .models import *


class BookingSerializer(serializers.ModelSerializer):

    def validate(self, data):
        date_start = data.get('date_start', None)
        date_end = data.get('date_end', None)

        if date_end < date_start:
            raise serializers.ValidationError({'error': 'Start time should not be earlier than the end time'})
        if date_start < now():
            raise serializers.ValidationError({'error': 'You cant book parking space for the past'})

        return data

    class Meta:
        model = Booking
        fields = '__all__'


class ParkingSpaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParkingSpace
        fields = '__all__'

#
# class UserSerializer(serializers.ModelSerializer):
#     # snippets = serializers.PrimaryKeyRelatedField(many=True, queryset=Snippet.objects.all())
#
#     class Meta:
#         model = User
#         fields = ('user_permissions', 'username', 'id')
