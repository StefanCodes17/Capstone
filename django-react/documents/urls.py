from django.urls import include,path
from rest_framework import routers
from documents.views import SentimentViewSet

router=routers.DefaultRouter()
router.register(r'sentiment_analysis',SentimentViewSet)

urlpatterns=[
    path('',include(router.urls)),
]