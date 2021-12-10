from django.shortcuts import render
from rest_framework import generics

from booking.models import Booking
from booking.serializers import BookingSerializer


def index(request):
    return render(request, 'frontend/index.html')


# class PurchaseList(generics.ListAPIView):
#     serializer_class = BookingSerializer
#
#     def get_queryset(self):
#         """
#         Optionally restricts the returned purchases to a given user,
#         by filtering against a `username` query parameter in the URL.
#         """
#         queryset = Booking.objects.all()
#         date = self.request.query_params.get('date')
#         if date is not None:
#             queryset = queryset.filter(date=date)
#         return queryset
