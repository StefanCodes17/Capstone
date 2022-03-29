from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token  # <-- Here

from . import views

urlpatterns = [
    #path('', views.UserListCreateAPIView.as_view(), name="create_users"),
    #path('<int:pk>', views.UserDetailAPIView.as_view(), name="retrieve_users"),
    #path('<int:pk>/update', views.UserDetailAPIView.as_view(), name="upudate_users"),
    #path('documents', views.document_library, name='documents'),
    path('register', views.RegisterView.as_view(), name='login_route'),
    path('email-verify', views.VerifyEmail.as_view(), name="email_verify")
    #path('api-token-auth/', obtain_auth_token, name='api_token_auth'),  # <-- And here

    #path('logout', views.logout_route, name='logout_route'),
]