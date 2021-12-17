from django.contrib import admin
from django.urls import path, include


urlpatterns = [

    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
    path('', include('booking.urls')),
    path('api-auth/', include('djoser.urls')),
    path('api-auth/', include('djoser.urls.jwt'))

]
