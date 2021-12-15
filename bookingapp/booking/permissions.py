from rest_framework import permissions


class BookingChangePermission(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        #     return request.user.has_perm('booking.view_booking', obj)
        # else:
        return request.user.has_perm('booking.change_booking', obj)


class BookingAddPermission(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        # if request.method in permissions.SAFE_METHODS:
        return request.user.has_perm('booking.add_booking')


class BookingDeletePermission(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        #     return request.user.has_perm('booking.view_booking', obj)
        # else:
        return request.user.has_perm('booking.delete_booking', obj)


class BookingViewPermission(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        return request.user.has_perm('booking.view_booking', obj)


class ParkingSpaceAddPermission(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        # if request.method in permissions.SAFE_METHODS:
        return request.user.has_perm('booking.add_parkingspace')


class ParkingSpaceDeletePermission(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        return request.user.has_perm('booking.delete_parkingspace', obj)


class ParkingSpaceChangePermission(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:
        return request.user.has_perm('booking.add_parkingspace', obj)


class ParkingSpaceViewPermission(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # if request.method in permissions.SAFE_METHODS:

        return request.user.has_perm('booking.view_parkingspace', obj)
