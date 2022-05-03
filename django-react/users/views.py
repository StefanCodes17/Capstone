from cgitb import lookup
from django.conf import settings
from re import A
from django.shortcuts import redirect
from rest_framework.response import Response
import jwt

from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .util import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from decouple import config
import pprint

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

class GetUser(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
        access = request.headers.get('Authorization').split(' ')[1]
        print("Get access token:", access)
        user_id = jwt.decode(access, getattr(settings, "SECRET_KEY", None), getattr(settings, "SIMPLE_JWT")["ALGORITHM"])["user_id"]
        user = User.objects.get(id=user_id)
        return Response({"email": user.email, "username": user.username}, status=status.HTTP_201_CREATED)

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        name = serializer.validated_data.get('name')
        if content is None:
            content = ""
        serializer.save(name=name)

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
        token= RefreshToken.for_user(user)

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
    def get(self, request):
        token=request.GET.get('token') # Gets access token from url
        try:
            payload = jwt.decode(token, key=settings.SECRET_KEY)
            user=User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified=True
                user.save()
            return redirect("index")
        except jwt.ExpiredSignatureError:
            return Response({'error': "Activation link expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError:
            return Response({'error': "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)


class LoginView(generics.GenericAPIView):
    serializer_class=LoginSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)