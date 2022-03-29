from django.urls import path

from . import views

urlpatterns = [
    path('', views.UserListCreateAPIView.as_view(), name="create_users"),
    path('<int:pk>', views.UserDetailAPIView.as_view(), name="retrieve_users"),
    path('documents', views.document_library, name='documents'),
    path('login', views.login_route, name='login_route'),
    path('logout', views.logout_route, name='logout_route'),
]