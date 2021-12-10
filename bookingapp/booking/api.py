# from .models import *
from rest_framework import viewsets, permissions
from .serializers import *


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    permissions_classes = [ permissions.DjangoModelPermissions ]
    serializer_class = BookingSerializer
    # def get_permissions(self):
    #     if self.action == 'list':
    #         permissions_classes = [ permissions.IsAuthenticated ]
    #     elif self.action == 'create':
    #         user = self.request.user.username

    # def perform_create(self, serializer):

