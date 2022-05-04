from django.urls import path, include
from rest_framework import routers
from .views import *
from documents.views import SentimentViewSet
from documents.views import SpellCheckViewSet

router = routers.DefaultRouter()

router.register(r'sentiment_analysis',SentimentViewSet)
router.register(r'spell_check',SpellCheckViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('doc/', DocumentList.as_view(), name='doc_list_and_create'),
    path('doc/<int:pk>/', DocumentSpecialOperations.as_view(), name='doc_update_and_delete'),
    path('folder/', FolderList.as_view(), name='folder_list_and_create'),
    path('folder/<int:pk>/', FolderSpecialOperations.as_view(), name='folder_update_and_delete'),
    path('tree', doc_and_folder_tree_view, name='doc_and_folder_tree_view'),
]