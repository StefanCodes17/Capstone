from django.urls import path, include
from . import views
from rest_framework import routers
from .views import *
from documents.views import SentimentViewSet
from documents.views import SpellCheckViewSet

router = routers.DefaultRouter()

router.register(r'folder', FolderViewSet)
router.register(r'doc', DocumentViewSet)
router.register(r'sentiment_analysis',SentimentViewSet)
router.register(r'spell_check',SpellCheckViewSet)

urlpatterns = [
    path('', include(router.urls))
]