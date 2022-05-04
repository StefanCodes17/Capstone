from django.conf import settings
import jwt
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets,status,generics
from rest_framework.decorators import api_view
from documents.sentiment import find_sentiment
from requests import request
from .models import *
from .serializers import *
from documents.spellcheck import jdSpellCorrect
from collections import defaultdict


# Gets user if logged in, otherwise None
def get_user(request):
    try:
        access = request.headers.get('Authorization').split(' ')[1]
        user_id = jwt.decode(access, getattr(settings, "SECRET_KEY", None), getattr(settings, "SIMPLE_JWT")["ALGORITHM"])["user_id"]
        user = User.objects.get(id=user_id)
        return user
    except:
        return None

# Create your views here.
class FolderList(generics.GenericAPIView):
    serializer_class=FolderSerializer
    queryset=FolderModel.objects.all()
    def get(self, request):
        #permission_classes=[IsAuthenticated]
        queryset=FolderModel.objects.all()      #queryset=FolderModel.objects.get(user=self.request.user)
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
            queryset_pk=FolderModel.objects.get(pk=pk)        #queryset_pk=FolderModel.objects.get(pk=pk, user=self.request.user)
        except:
            return Response({'error': 'No folder found'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer=self.serializer_class(queryset_pk)
        return Response(serializer.data)
    
    def put(self, request, pk):
        queryset_pk=FolderModel.objects.get(pk=pk)          #queryset_pk=FolderModel.objects.get(pk=pk, user=self.request.user)
        serializer = self.serializer_class(queryset_pk, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        queryset_pk=FolderModel.objects.get(pk=pk)          #queryset_pk=FolderModel.objects.get(pk=pk, user=self.request.user)
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
    permission_classes=[IsAuthenticated]

    def get(self, request, pk):
        try:
            user = get_user(request)
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

# This loads all documents and folders belonging to a logged in user and arranges
# them in a tree JSON structure
@api_view(["GET"])
def doc_and_folder_tree_view(request):
    try:
        documents = DocumentSerializer(DocumentModel.objects.all(), many=True).data
        folders = FolderSerializer(FolderModel.objects.all(), many=True).data
        # this makes it easier to find folders by id
        folders_by_id = {}
        # this will contain nested file structure
        tree = []
        # Key: folder_id, value: list of documents and folders in that folder
        buckets = defaultdict(list)
        # sort all folders by parent folder
        for f in folders:
            folders_by_id[f['id']] = f
            if f['parent_folder_id'] != None:
                buckets[f['parent_folder_id']].append(f)
            else:
                tree.append(f)
        # sort all documents by parent folder
        for d in documents:
            if d['parent_folder_id'] != None:
                buckets[d['parent_folder_id']].append(d)
            else:
                tree.append(d)
        # insert children into folder objects under the property children (list)
        for folder_id, children in buckets.items():
            folders_by_id[folder_id]['children'] = children
        return Response(tree, status=status.HTTP_200_OK)
    except:
        return Response({'error': 'Failed to find your files!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
