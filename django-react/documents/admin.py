from django.contrib import admin
from .models import *

# Register your models here.
class FolderAdmin(admin.ModelAdmin):
    list_display = ['folder_id', 'user_id', 'title', 'is_root', 'parent_folder_id']

class DocumentAdmin(admin.ModelAdmin):
    list_display = ['doc_id', 'user_id', 'date_created', 'date_modified', 'title', 'content', 'folder_id']

class SentimentAdmin(admin.ModelAdmin):
    list_display = ['query_string', 'raw_score', 'sentiment']

admin.site.register(Folder, FolderAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(SentimentModel,SentimentAdmin)