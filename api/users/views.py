from django.shortcuts import render
from django.http import JsonResponse

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