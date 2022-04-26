from .models import Document
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
    queryset = Folder.objects.all()
    #permission_classes = [IsAuthenticated]

    def create(self, request, *args,**kwargs):
        serializer=FolderSerializer
        query_data=request.data
        parentid=Folder.parent_id(query_data['is_root'])
        new_query=Folder.objects.create(folder_id=query_data['folder_id'], user_id=query_data['user_id'], title=query_data['title'], is_root=query_data['is_root'], parent_folder_id=parentid)
        new_query.save()
        return Response(serializer(new_query).data, status=status.HTTP_201_CREATED)

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    queryset = Document.objects.all()#.filter(user_id = 2)
    #queryset = Document.objects.get()#all().filter(user_id = 2)

    #def create(self, request, *args, **kwargs):
     #   serializer=DocumentSerializer
      #  query_data=request.data
        #new_query=Document.objects.create(query_data)
       # query_data.save()
        #return Response(serializer(query_data).data, status=status.HTTP_201_CREATED)

#def createdoc(request):
 #   if request.method == 'POST':
  #      serializer=DocumentSerializer(data=request.data)
   #     if serializer.is_valid():
    #        serializer.save()
     #       return Response(serializer.data, status=status.HTTP_201_CREATED)

class DocumentListAPIView(generics.ListAPIView):
    queryset=Document.objects.all()#.filter(user_id=request.user_id)
    serializer_class=DocumentSerializer
    #permission_classes=[IsAuthenticated]

class DocumentCreateAPIView(generics.CreateAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    #permission_classes = [IsAuthenticated]

class DocumentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset=Document.objects.all()#.filter(user_id=request.user_id)
    serializer_class=DocumentSerializer
    #permission_classes=[IsAuthenticated]
    #renderer_classes = [JSONRenderer]
    lookup_field='doc_id'

#class DocumentList(APIView):
 #   def get(self, request, format=None):
  #      queryset=Document.objects.all()
   #     serializer=DocumentSerializer(queryset, many=True)
    #    return Response(serializer.data)

    #def post(self, request, format=None):
     #   serializer = DocumentSerializer(data=request.data)
      #  if serializer.is_valid():
       #     serializer.save()
        #    return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
