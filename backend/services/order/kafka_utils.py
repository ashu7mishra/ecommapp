from kafka import KafkaProducer
import json
from django.conf import settings

producer = KafkaProducer(
    bootstrap_servers=settings.KAFKA_BOOTSTRAP_SERVERS,
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

def send_notification_event(event_type, data):
    """
    Sends a notification event to the 'notifications' Kafka topic.
    """
    message = {
        'type': event_type,
        'data': data
    }
    producer.send('notifications', message)
