from django.urls import path

from .api import BookingViewSet, ParkingSpaceViewSet

urlpatterns = [

    path('api/bookings/', BookingViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/bookings/<int:pk>/', BookingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('api/parking_space/', ParkingSpaceViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/parking_space/<int:pk>/', ParkingSpaceViewSet.as_view({'delete': 'destroy'})),
]