from kafka import KafkaProducer
import json

# Initialize Kafka producer
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
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
