import json
import logging
from kafka import KafkaProducer
from kafka.errors import KafkaError
from django.conf import settings

logger = logging.getLogger(__name__)

def get_kafka_producer():
    """
    Creates and returns a Kafka producer instance.
    Uses lazy initialization to avoid connection errors at import time.
    """
    try:
        return KafkaProducer(
            bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
            value_serializer=lambda v: json.dumps(v).encode('utf-8')
        )
    except KafkaError as e:
        logger.error(f"[Kafka] Failed to initialize producer: {e}")
        return None

def send_notification_event(event_type, data):
    """
    Sends a notification event to the 'notifications' Kafka topic.
    """
    producer = get_kafka_producer()
    if not producer:
        logger.warning(f"[Kafka] Could not send event, producer is None")
        return

    message = {
        'type': event_type,
        'data': data
    }

    try:
        producer.send('notifications', message)
        producer.flush()
        logger.info(f"[Kafka] Notification sent: {message}")
    except KafkaError as e:
        logger.error(f"[Kafka] Failed to send message: {e}")
