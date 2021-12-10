import rest_framework.generics as generics
from django.shortcuts import render
from rest_framework import viewsets, permissions

from booking.models import Booking
from booking.serializers import BookingSerializer


class BookingListView(generics.ListAPIView):

    serializer_class = BookingSerializer
    queryset = Booking.objects.all().order_by('date_start')


class BookingRetrieveView(generics.RetrieveAPIView):

    queryset = Booking.objects.filter(draft=False)
    serializer_class = BookingSerializer


class BookingCreateView(generics.CreateAPIView):

    serializer_class = BookingSerializer


# class BookingViewSet(viewsets.ViewSet):
#
#     def list(self, request):
#         queryset = Booking.objects.all()
#         permissions_classes = [
#             permissions.DjangoModelPermissions
#         ]
#         serializer_class = BookingSerializer
#     def retrieve(self, request, pk=None):
#         queryset = Booking.objects.all()
#         permissions_classes = [
#             permissions.DjangoModelPermissions
#         ]
#         serializer_class = BookingSerializer