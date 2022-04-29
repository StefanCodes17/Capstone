from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import viewsets,status,generics
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
    serializer_class = FolderSerializer
    queryset = FolderModel.objects.all()
    #permission_classes = [IsAuthenticated]

    def create(self, request, *args,**kwargs):
        serializer=FolderSerializer
        query_data=request.data
        parentid=FolderModel.parent_id(query_data['is_root'])
        new_query=FolderModel.objects.create(folder_id=query_data['folder_id'], user_id=query_data['user_id'], title=query_data['title'], is_root=query_data['is_root'], parent_folder_id=parentid)
        new_query.save()
        return Response(serializer(new_query).data, status=status.HTTP_201_CREATED)

class FolderList(generics.GenericAPIView):
    serializer_class=FolderSerializer
    queryset=FolderModel.objects.all()
    def get(self, request):
        #permission_classes=[IsAuthenticated]
        queryset=FolderModel.objects.all()
        serializer=self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        #permission_classes=[IsAuthenticated]
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FolderSpecialOperations(generics.GenericAPIView):
    serializer_class=FolderSerializer
    queryset=FolderModel.objects.all()
    def get(self, request, pk):
        #permission_classes=[IsAuthenticated]
        try:
            queryset_pk=FolderModel.objects.get(pk=pk)
        except:
            return Response({'error': 'No folder found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer=self.serializer_class(queryset_pk)
        return Response(serializer.data)
    
    def put(self, request, pk):
        queryset_pk=FolderModel.objects.get(pk=pk)
        serializer = self.serializer_class(queryset_pk, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        queryset_pk=FolderModel.objects.get(pk=pk)
        queryset_pk.delete()
        return Response({'status': 'Successfully Deleted'}, status=status.HTTP_200_OK)

class DocumentList(generics.GenericAPIView):
    serializer_class=DocumentSerializer
    queryset=DocumentModel.objects.all()
    def get(self, request):
        #permission_classes=[IsAuthenticated]
        queryset=DocumentModel.objects.all()
        serializer=self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def post(self, request):
        #permission_classes=[IsAuthenticated]
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DocumentSpecialOperations(generics.GenericAPIView):
    serializer_class=DocumentSerializer
    queryset=DocumentModel.objects.all()
    def get(self, request, pk):
        #permission_classes=[IsAuthenticated]
        try:
            queryset_pk=DocumentModel.objects.get(pk=pk)
        except:
            return Response({'error': 'No document found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer=self.serializer_class(queryset_pk)
        return Response(serializer.data)
    
    def put(self, request, pk):
        queryset_pk=DocumentModel.objects.get(doc_id=pk)
        serializer = self.serializer_class(queryset_pk, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        queryset_pk=DocumentModel.objects.get(doc_id=pk)
        queryset_pk.delete()
        return Response({'status': 'Successfully Deleted'}, status=status.HTTP_200_OK)

class SentimentViewSet(viewsets.ModelViewSet):
    queryset=SentimentModel.objects.all()
    serializer_class=SentimentSerializer
    #permission_classes = [IsAuthenticated]
    
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
