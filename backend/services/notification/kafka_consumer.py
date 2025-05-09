import json
import logging
from kafka import KafkaConsumer
from django.conf import settings
import django
import os

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')  # adjust as needed
django.setup()

from django.contrib.auth import get_user_model
from .models import Notification

User = get_user_model()

# Configure logger
logger = logging.getLogger('notifications')

def create_notification_from_event(data):
    user_id = data.get("user_id")
    message = data.get("message")
    notif_type = data.get("type", "info")

    try:
        user = User.objects.get(id=user_id)
        Notification.objects.create(
            user=user,
            message=message,
            type=notif_type
        )
        logger.info(f"Notification created: '{message}' for user_id={user_id}")
    except User.DoesNotExist:
        logger.error(f"User with ID {user_id} not found. Cannot create notification.")

def start_kafka_consumer():
    try:
        consumer = KafkaConsumer(
            'notifications',
            bootstrap_servers=['localhost:9092'],
            auto_offset_reset='earliest',
            group_id='notification-service',
            value_deserializer=lambda x: json.loads(x.decode('utf-8'))
        )
        logger.info("Kafka Consumer started and listening to 'notifications' topic...")

        for message in consumer:
            logger.info(f"Received message from Kafka: {message.value}")
            create_notification_from_event(message.value)

    except Exception as e:
        logger.exception(f"Kafka consumer failed: {str(e)}")
