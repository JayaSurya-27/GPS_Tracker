from django.contrib.auth.backends import BaseBackend
from .models import Bus


class BusAuthBackend(BaseBackend):
    def authenticate(self, request, id=None, password=None):
        try:
            bus = Bus.objects.get(id=id)
            if bus.check_password(password):
                return bus
        except Bus.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return Bus.objects.get(pk=user_id)
        except Bus.DoesNotExist:
            return None
