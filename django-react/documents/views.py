from django.shortcuts import render
from .models import Document

# Create your views here.
from django.shortcuts import render
from requests import request
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()#.filter(user_id = 2)
    #queryset = Document.objects.get()#all().filter(user_id = 2)
    serializer_class = DocumentSerializer