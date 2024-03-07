from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


@api_view(['GET'])
@permission_classes([AllowAny])
def get_latest_bus_location(request, bus_id):
    if request.method == 'GET':
        try:
            print(bus_id)
            latest_location = get_object_or_404(BusLocation.objects.filter(bus_id=bus_id).order_by('-timestamp')[:1])
            serializer = BusLocationSerializer(latest_location)
            return Response({'action': 'Get Latest Bus Location', 'data': serializer.data}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'action': 'Get Latest Bus Location', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


# @api_view(['POST'])
# @permission_classes([AllowAny])
# def update_bus_location(request):
#     if request.method == 'POST':
#         try:
#             serializer = BusLocationSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({'action': 'Update Bus Location', 'data': serializer.data}, status=status.HTTP_201_CREATED)
#
#             return Response({'action': 'Update Bus Location', 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#
#         except Exception as e:
#             return Response({'action': 'Update Bus Location', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
#
#     return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
@permission_classes([AllowAny])
def update_bus_location(request):
    if request.method == 'POST':
        try:
            # print(request.data)
            serializer = BusLocationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()

                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    "common_room",
                    {
                        'type': 'chat_message',
                        'latitude': serializer.data['latitude'],
                        'longitude': serializer.data['longitude'],
                    }
                )
                print('hello')
                return Response({'action': 'Update Bus Location', 'data': serializer.data}, status=status.HTTP_201_CREATED)

            return Response({'action': 'Update Bus Location', 'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'action': 'Update Bus Location', 'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

