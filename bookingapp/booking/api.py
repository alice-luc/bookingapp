from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError

from .permissions import *
from .serializers import *
from .services.booking_available_time import time_not_available_error_message, check_availability


class BookingViewSet(LoginRequiredMixin, viewsets.ModelViewSet):

    queryset = Booking.objects.all()
    permissions_classes = [permissions.IsAuthenticated]
    serializer_class = BookingSerializer
    permissions_classes_by_action = {
        'get': [BookingViewPermission],
        'add': [BookingAddPermission],
        'update': [BookingChangePermission],
        'destroy': [BookingDeletePermission],
    }

    def perform_create(self, serializer):

        if serializer.is_valid():
            count, nearer_available_time = check_availability(serializer.validated_data)
            print(count, nearer_available_time)
            if count:
                serializer.save()
            else:
                raise ValidationError({'error': time_not_available_error_message, 'body': nearer_available_time})

    def perform_update(self, serializer):

        if serializer.is_valid():
            serializer.validated_data['id'] = self.get_object().pk
            count, nearer_available_time = check_availability(serializer.validated_data)
            print(count, nearer_available_time)

            if count:
                serializer.save()
            else:
                raise ValidationError({'error': time_not_available_error_message, 'body': nearer_available_time})


class ParkingSpaceViewSet(LoginRequiredMixin, viewsets.ModelViewSet):

    queryset = ParkingSpace.objects.all()
    permissions_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]
    serializer_class = ParkingSpaceSerializer
    permissions_classes_by_action = {
        'get': [ParkingSpaceViewPermission],
        'add': [ParkingSpaceAddPermission],
        'destroy': [ParkingSpaceDeletePermission],
        'update': [ParkingSpaceChangePermission]
    }
