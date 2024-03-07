import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import BusLocation  # Import your BusLocation model here

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = 'common_room'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,

            }
        )

    def send_coordinates(self, event):
        message = event['message']
        latitude = event['latitude']
        longitude = event['longitude']
        bus_id = event['bus_id']
        timestamp = event['timestamp']

        self.send(text_data=json.dumps({
            'type': 'chat',
            'message': message,
            'latitude': latitude,
            'longitude': longitude,
            'bus_id': bus_id,
            'timestamp': timestamp
        }))
