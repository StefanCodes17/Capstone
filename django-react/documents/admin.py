from django.contrib import admin
from .models import *

# Register your models here.
class FolderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_id', 'title', 'is_root', 'parent_folder_id']

class DocumentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_id', 'date_created', 'date_modified', 'title', 'content', 'parent_folder_id']

class SentimentAdmin(admin.ModelAdmin):
    list_display=['query_string','raw_score','sentiment']

class SpellCheckAdmin(admin.ModelAdmin):
    list_display=['query_word','dictionary','word_count','correct_words']

admin.site.register(FolderModel, FolderAdmin)
admin.site.register(DocumentModel, DocumentAdmin)
admin.site.register(SentimentModel, SentimentAdmin)
admin.site.register(SpellCheckModel, SpellCheckAdmin)