from rest_framework import serializers
from .models import *
from documents.models import SentimentModel

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ('folder_id', 'user_id', 'title', 'is_root', 'parent_folder_id')

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('user_id', 'title', 'content', 'folder_id')

class SentimentSerializer(serializers.ModelSerializer):
    class Meta:
        model=SentimentModel
        fields=('query_string','raw_score','sentiment')
        read_only_fields=('raw_score','sentiment')