from django.apps import AppConfig


class DocumentsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'documents'

class FolderConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'folder'

class SentimentApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'sentiment_api'
