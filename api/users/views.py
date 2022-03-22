from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout

# Create your views here.
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
	return JsonResponse(data, safe=False)

def login_route(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse("Logged in!")
    else:
        return HttpResponse("Wrong username or password")

def logout_route(request):
    logout(request)
    return HttpResponse("Logged out")