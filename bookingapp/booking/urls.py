from django.urls import path
from rest_framework import routers

from .api import BookingViewSet, ParkingSpaceViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# router = routers.DefaultRouter()
# router.register('api/bookings', BookingViewSet, 'booking')
# router.register('api/parking_space', ParkingSpaceViewSet, 'parking')
#
#
# urlpatterns = router.urls
urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('bookings/', BookingViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('bookings/<int:pk>/', BookingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
    path('parking_space/', ParkingSpaceViewSet.as_view({'get': 'list', 'post': 'create'}))
]