from django.urls import path

from . import views

urlpatterns = [
    path('', views.UserMixinView.as_view(), name="create_users"),
    path('<int:pk>', views.UserMixinView.as_view(), name="retrieve_users"),
    path('<int:pk>/update', views.UserMixinView.as_view(), name="upudate_users"),
    path('documents', views.document_library, name='documents'),
    path('login', views.login_route, name='login_route'),
    path('logout', views.logout_route, name='logout_route'),
]