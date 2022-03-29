from rest_framework.response import Response

from rest_framework import generics, mixins
from rest_framework.decorators import api_view
from users.serializers import UserSerializer

from .models import User

class UserMixinView(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView,
    ):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        if(pk is not None):
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

def document_library(request):
	data = [
        {
        'filename': "Lab Notes",
        'create_date': "2022-03-09 11:00:00",
        'modified_date': "2022-03-09 13:00:00",
        'id': 1
        },
        {
        'filename': "Todo",
        'create_date': "2022-03-10 11:00:00",
        'modified_date': "2022-03-10 11:30:00",
        'id': 2
        },
        {
        'filename': "Freewriting March 15",
        'create_date': "2022-03-11 11:00:00",
        'modified_date': "2022-03-09 13:00:00",
        'id': 3
        },
	]
	return Response(data, safe=False)

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Validate and add context info to data
    # def perform_create(self, serializer):

class UserDetailAPIView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(["POST"])
def login_route(request, *args, **kwargs):
    serializer = UserSerializer(data=request.data)
    for obj in User.objects.all():
        print(obj)
    if serializer.is_valid():
        #serializer.save()
        pass
    return Response(serializer.data)

@api_view(["POST"])
def logout_route(request):
    return Response("Logged out")