from django.urls import path, include
from . import views
from rest_framework import routers
from .views import *
from documents.views import SentimentViewSet

router = routers.DefaultRouter()

router.register(r'folder', FolderViewSet)
router.register(r'doc', DocumentViewSet)
router.register(r'sentiment_analysis',SentimentViewSet)

urlpatterns = [
    path('', include(router.urls))
]