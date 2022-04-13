from .models import Document
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,status
from documents.serializers import SentimentSerializer
from documents.models import SentimentModel
from rest_framework.views import APIView
from documents.sentiment import find_sentiment

class SentimentViewSet(viewsets.ModelViewSet):
    queryset=SentimentModel.objects.all()
    serializer_class=SentimentSerializer
    
    def create(self,request,*args,**kwargs):
        serializer=SentimentSerializer
        query_data=request.data
        sentiment_analysis=find_sentiment(str(query_data['query_string']))
        new_query=SentimentModel.objects.create(query_string=query_data['query_string'], raw_score=sentiment_analysis[1],sentiment=sentiment_analysis[0]);
        new_query.save()
        return Response(serializer(new_query).data, status=status.HTTP_201_CREATED)
