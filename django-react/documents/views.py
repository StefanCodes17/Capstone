from .models import Document
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,status
from documents.serializers import SentimentSerializer
from documents.models import SentimentModel
from rest_framework.views import APIView
from documents.sentiment import find_sentiment
from requests import request
from .models import *
from .serializers import *
from documents.spellcheck import jdSpellCorrect

# Create your views here.
class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()#.filter(user_id = 2)
    #queryset = Document.objects.get()#all().filter(user_id = 2)
    serializer_class = DocumentSerializer

class SentimentViewSet(viewsets.ModelViewSet):
    queryset=SentimentModel.objects.all()
    serializer_class=SentimentSerializer
    
    def create(self,request):
        serializer=SentimentSerializer
        query_data=request.data
        sentiment_analysis=find_sentiment(str(query_data['query_string']))
        new_query=SentimentModel.objects.create(query_string=query_data['query_string'], raw_score=sentiment_analysis[1],sentiment=sentiment_analysis[0]);
        new_query.save()
        return Response(serializer(new_query).data, status=status.HTTP_201_CREATED)
    
class SpellCheckViewSet(viewsets.ModelViewSet):
    queryset=SpellCheckModel.objects.all()
    serializer_class=SpellCheckSerializer
    
    def create(self,request):
        serializer=SentimentSerializer
        query_data=request.data
        spell_check_words=jdSpellCorrect(str(query_data['query_word']),str(query_data['dictionary']),int(query_data['word_count']))
        correct_words_str=" ".join(str(word) for word in  spell_check_words)
        new_query=SpellCheckModel.objects.create(query_word=query_data['query_word'], dictionary=query_data['dictionary'],word_count=query_data['word_count'],correct_words=correct_words_str.strip())
        new_query.save()
        return Response(serializer(new_query).data, status=status.HTTP_201_CREATED)