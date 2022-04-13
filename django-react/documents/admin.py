from django.contrib import admin
from .models import *

# Register your models here.
class FolderAdmin(admin.ModelAdmin):
    pass

class DocumentAdmin(admin.ModelAdmin):
    pass

class SentimentAdmin(admin.ModelAdmin):
    pass

admin.site.register(Folder, FolderAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(SentimentModel,SentimentAdmin)