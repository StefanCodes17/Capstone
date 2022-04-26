from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('', views.UserListCreateAPIView.as_view(), name="create_users"),
    #path('<int:pk>', views.UserDetailAPIView.as_view(), name="retrieve_users"),
    #path('<int:pk>/update', views.UserDetailAPIView.as_view(), name="upudate_users"),
    #path('documents', views.document_library, name='documents'),
    path('login', views.LoginView.as_view(), name='login_route'),
    path('register', views.RegisterView.as_view(), name='register_route'),
    path('email-verify', views.VerifyEmail.as_view(), name="email_verify"),
    path('get_user', views.GetUser.as_view(), name="get_user"),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    #path('logout', views.logout_route, name='logout_route'),
]