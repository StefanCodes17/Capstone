from django.urls import path

from . import views

urlpatterns = [
    path('documents', views.document_library, name='documents'),
    path('login', views.login_route, name='login_route'),
    path('logout', views.logout_route, name='logout_route'),
]