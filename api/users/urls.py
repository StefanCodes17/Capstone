from django.urls import path

from . import views

urlpatterns = [
    path('documents', views.document_library, name='documents'),
    path('login', views.document_library, name='login_route'),
]