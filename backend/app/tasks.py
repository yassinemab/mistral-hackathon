from celery import shared_task

import json
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Post

import time

@shared_task
def fetch_definitions(post_id):
    time.sleep(5)

    post = Post.objects.filter(id=post_id).first()

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        f"", {
            "type": "chat_message", "message": post.serialize()}
    )
