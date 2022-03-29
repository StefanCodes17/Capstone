from importlib.resources import read_binary
from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed

class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model= User
        fields=[
            'id',
            'email',
            'username',
            'password'
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model= User
        fields=[
            'email',
            'username',
            'password'
        ]

    def validate(self, attrs):
        email=attrs.get('email', '')
        username=attrs.get('username', '')

        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=255, min_length=2)
    password=serializers.CharField(max_length=68, min_length=6, write_only=True)
    username=serializers.CharField(max_length=255, min_length=2, read_only=True)
    tokens=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model= User
        fields=[
            'email',
            'username',
            'password',
            'tokens'
        ]

    def validate(self, attrs):
        email=attrs.get('email', '')
        password=attrs.get('password', '')

        user=auth.authenticate(email=email, password=password)
        if(not user):
            raise AuthenticationFailed("Invalid credentials")

        return {
            'email': user.email,
            'username': user.username,
            'tokens': user.tokens() 
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)