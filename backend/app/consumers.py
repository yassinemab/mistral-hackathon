# chat/consumers.py
import json

from channels.generic.websocket import AsyncWebsocketConsumer
import sys


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    # Receive message from WebSocket
    async def receive(self, message):
        message_json = json.loads(message)

        # Receives a chat message
        if message_json['type'] == 'message':
            print("MESSAGE RECEIVED", file=sys.stderr)

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        message_type = event["type"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message, "type": message_type}))