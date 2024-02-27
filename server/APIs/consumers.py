import json
from channels.generic.websocket import AsyncWebsocketConsumer , WebsocketConsumer

from django.template.loader import render_to_string
from django.conf import settings

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send_initial_html()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        await self.send_chat_message(message)

    async def send_initial_html(self):
        initial_html_content = render_to_string('maps/gps_map.html', {'google_maps_api_key': settings.GOOGLE_MAPS_API_KEY})
        await self.send(text_data=json.dumps({
            'type': 'html_response',
            'html_content': initial_html_content
        }))

    async def send_html_response(self, event):
        html_content = event['html_content']
        await self.send(text_data=json.dumps({
            'type': 'html_response',
            'html_content': html_content
        }))
