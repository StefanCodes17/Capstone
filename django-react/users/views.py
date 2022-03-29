import email
from re import A
from rest_framework.response import Response

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .util import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

# from users.serializers import UserSerializer

# from django.contrib.auth.models import User

# def document_library(request):
# 	data = [
#         {
#         'filename': "Lab Notes",
#         'create_date': "2022-03-09 11:00:00",
#         'modified_date': "2022-03-09 13:00:00",
#         'id': 1
#         },
#         {
#         'filename': "Todo",
#         'create_date': "2022-03-10 11:00:00",
#         'modified_date': "2022-03-10 11:30:00",
#         'id': 2
#         },
#         {
#         'filename': "Freewriting March 15",
#         'create_date': "2022-03-11 11:00:00",
#         'modified_date': "2022-03-09 13:00:00",
#         'id': 3
#         },
# 	]
# 	return Response(data, safe=False)

# class UserListCreateAPIView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         name = serializer.validated_data.get('name')
#         if content is None:
#             content = ""
#         serializer.save(name=name)

# class UserDetailAPIView(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class Login(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = UserSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

class RegisterView(generics.GenericAPIView):
    # permission_classes = (IsAuthenticated,)             # <-- And here
    serializer_class=RegisterSerializer
    # def get(self, request):
    #     content = {'message': 'Hello, World!'}
    #     return Response(content)
    def post(self, request, *args, **kwargs):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data=serializer.data
        user=User.objects.get(email=user_data['email'])
        token= RefreshToken.for_user(user).access_token

        current_site=get_current_site(request).domain
        relative_link= reverse('email_verify')
        absurl='http://' + current_site + relative_link +"?token=" + str(token)
        
        email_body='Welcome to Lifepad, ' + user.username + "!" + "\n Use link below to verify email!\n" + absurl
        
        data={
            'domain':absurl,
            'subject':'Email Verification Step!',
            'body': email_body,
            'recipient': user.email
        }
        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)

class VerifyEmail(generics.GenericAPIView):
    def get(self):
        pass


class LoginView(generics.GenericAPIView):

    serializer_class=LoginSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)