from django.urls import path
from .views import NotificationListCreateAPIViews, NotificationRetrieveUpdateDestroyAPIView


urlpatterns = [
    path('', NotificationListCreateAPIViews.as_view(), name='notification-list-create'),
    path('<int:pk>/', NotificationRetrieveUpdateDestroyAPIView.as_view(), name='notification-details')
]
