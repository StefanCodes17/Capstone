from sys import prefix
from django.urls import path, re_path, include
from . import views
from rest_framework import routers
from .views import *
from documents.views import SentimentViewSet
from documents.views import SpellCheckViewSet

router = routers.DefaultRouter()

router.register(r'folder', FolderViewSet)
router.register(r'sentiment_analysis',SentimentViewSet)
router.register(r'spell_check',SpellCheckViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('doc', DocumentList.as_view(), name='list_and_create'),
    path('doc/<int:pk>/', DocumentSpecialOperations.as_view(), name='update_and_delete')
]