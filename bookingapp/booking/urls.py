from rest_framework import routers
from .api import BookingViewSet
from .views import BookingCreateView

router = routers.DefaultRouter()
router.register('api/bookings', BookingViewSet, 'booking')
router.register('api/book', BookingCreateView, 'book')


urlpatterns = router.urls