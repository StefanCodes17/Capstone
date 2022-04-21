from email.policy import default
from operator import truediv
from django.db import models
from users.models import User
# Create your models here.

class Folder(models.Model):
    folder_id=models.AutoField(primary_key=True)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE) #CHANGE TO FOREIGN KEY
    title=models.CharField(max_length=255)
    is_root=models.BooleanField(default=False)
    parent_folder_id=models.ForeignKey('self', null=True, default=None, on_delete=models.CASCADE)

    #def root(self, *args, **kwargs):
     #   if(self.is_root == True):
      #      self.parent_folder_id = 0

    #def __str__(self):
     #   return self.folder_id

class Document(models.Model):
    doc_id=models.AutoField(primary_key=True)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE)
    date_created=models.DateTimeField(auto_now_add=True)
    date_modified=models.DateTimeField(auto_now=True)
    title=models.CharField(max_length=255, unique=True)
    content=models.TextField()
    folder_id=models.ForeignKey(Folder, null=True, default=None, on_delete=models.CASCADE) #CHANGE TO FOREIGN KEY

class SentimentModel(models.Model):
    query_string=models.CharField(max_length=500,default="")
    raw_score=models.FloatField(default=0) 
    sentiment=models.CharField(max_length=100,default='Neutral')
    
    #def __str__(self):
     #   return self.doc_id

    #def create_document():