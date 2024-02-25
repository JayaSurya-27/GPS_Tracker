from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Your regular HTTP endpoints
    path('bus_location/<str:bus_id>/', get_latest_bus_location, name='get_latest_bus_location'),
    path('update_bus_location/', update_bus_location, name='update_bus_location'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

