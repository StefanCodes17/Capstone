from django.urls import path

from . import views

urlpatterns = [
    path('documents', views.document_library, name='documents'),
]