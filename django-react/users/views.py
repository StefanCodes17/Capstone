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
from documents.serializers import DocumentSerializer, FolderSerializer


def intro_doc(request):
    folder_data = {
            'title': 'Template Folder',
            'is_root': True
        }
    folder_data2 = {
            'title': 'Template Sub-Folder',
        }
    
    doc_data = {
            'title': 'Welcome',
            'content': 'Welcome to LifePad! Here you can get started by creating a document or folder. Have fun creating your life stories with LifePad!'
        }
    doc_data2 = {
            'title': 'Sample Document in Sub-Folder',
            'content': 'As you can see, the ability of creating subfolders is in the power of your hands. Take this opportunity to make your life more organized!',
        }
    doc_data3 = {
            'title': 'Sample Document in Folder',
            'content': 'The ability of creating documents within a folder is in the power of your hands. Take this opportunity to make your life more organized!',
        }
    
    folder_serializer = FolderSerializer(data=folder_data)
    folder_serializer2 = FolderSerializer(data=folder_data2)
    doc_serializer = DocumentSerializer(data=doc_data)
    doc_serializer2 = DocumentSerializer(data=doc_data2)
    doc_serializer3 = DocumentSerializer(data=doc_data3)
    first_folder_id = folder_serializer
    second_folder_id = folder_serializer2
    if folder_serializer.is_valid():
        first_folder_id = folder_serializer.save(user_id=request.lifepad_user)
        folder_serializer.save(user_id=request.lifepad_user)
    if folder_serializer2.is_valid():
        second_folder_id = folder_serializer2.save(user_id=request.lifepad_user)
        folder_serializer2.save(user_id=request.lifepad_user, parent_folder_id=first_folder_id)
    if doc_serializer.is_valid():
        doc_serializer.save(user_id=request.lifepad_user)
    if doc_serializer2.is_valid():
        doc_serializer2.save(user_id=request.lifepad_user, parent_folder_id=second_folder_id)
    if doc_serializer3.is_valid():
        doc_serializer3.save(user_id=request.lifepad_user, parent_folder_id=first_folder_id)

class GetUser(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        access = request.headers.get('Authorization').split(' ')[1]
        # print("Get access token:", access)
        user_id = jwt.decode(access, getattr(settings, "SECRET_KEY", None), getattr(settings, "SIMPLE_JWT")["ALGORITHM"])["user_id"]
        #user = User.objects.get(id=user_id)
        user = request.lifepad_user
        if user:
            if user.initial_login:
                intro_doc(request)
                user.initial_login = False
                user.save()
            return Response({"email": user.email, "username": user.username}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Not logged in"}, status=status.HTTP_404_NOT_FOUND)

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