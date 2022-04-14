from rest_framework import serializers
from .models import *

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ('folder_id', 'user_id', 'title', 'is_root', 'parent_folder_id')

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('user_id', 'title', 'content', 'folder_id')