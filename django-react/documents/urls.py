from sys import prefix
from django.urls import path, re_path, include
from . import views
from rest_framework import routers
from .views import *
from documents.views import SentimentViewSet

router = routers.DefaultRouter()

#router.register(r'folder', FolderViewSet)
#router.register(r'doc', DocumentViewSet)
#router.register(prefix='doc/{pk}', DocumentViewSet)
router.register(r'sentiment_analysis',SentimentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('view/', DocumentListAPIView.as_view(), name='list'),
    path('create/', DocumentCreateAPIView.as_view(), name='create'),
    re_path(r'^(?P<doc_id>\d+)/$', DocumentRetrieveUpdateDestroyAPIView.as_view(), name='find'),
    #path('', DocumentViewSet.as_view({'get': 'list', 'post': 'list'})),
    #path('folder/', FolderViewSet.as_view({'get': 'list'})),
    #path('sentiment_analysis/', SentimentViewSet.as_view(), name='sentiment')
]