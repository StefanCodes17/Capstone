from rest_framework import serializers
from .models import *
from documents.models import SentimentModel
from documents.models import SpellCheckModel

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderModel
        fields = ('id', 'user_id', 'title', 'is_root', 'parent_folder_id')

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentModel
        fields = ('id', 'user_id', 'title', 'content', 'parent_folder_id') #user_id for checking purposes

class SentimentSerializer(serializers.ModelSerializer):
    class Meta:
        model=SentimentModel
        fields=('query_string','raw_score','sentiment')
        read_only_fields=('raw_score','sentiment')

class SpellCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model=SpellCheckModel
        fields=('query_word','dictionary','word_count','correct_words')
        read_only_fields=['correct_words']