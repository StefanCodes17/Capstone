from asyncio.windows_events import NULL
from email.policy import default
from operator import truediv
from django.db import models
from users.models import User
# Create your models here.

class FolderModel(models.Model):
    folder_id=models.AutoField(primary_key=True)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE) #CHANGE TO FOREIGN KEY
    title=models.CharField(max_length=255, unique=True)
    is_root=models.BooleanField(default=False)
    parent_folder_id=models.ForeignKey('self', null=True, default=None, on_delete=models.CASCADE)

    @property
    def parent_id(self):
        if(self.is_root is True):
            self.parent_folder_id = False
        return self.parent_folder_id

    #def root(self, *args, **kwargs):
     #   if(self.is_root == True):
      #      self.parent_folder_id = 0

    def __str__(self):
        return self.title

class DocumentModel(models.Model):
    doc_id=models.AutoField(primary_key=True)
    user_id=models.ForeignKey(User, on_delete=models.CASCADE)
    date_created=models.DateTimeField(auto_now_add=True)
    date_modified=models.DateTimeField(auto_now=True)
    title=models.CharField(max_length=255, unique=True)
    content=models.TextField()
    folder_id=models.ForeignKey(FolderModel, null=True, default=None, on_delete=models.CASCADE) #CHANGE TO FOREIGN KEY

    def __str__(self):
        return self.title

class SentimentModel(models.Model):
    query_string=models.CharField(max_length=2000,default="")
    raw_score=models.FloatField(default=0) 
    sentiment=models.CharField(max_length=100,default='Neutral')

class SpellCheckModel(models.Model):
    query_word=models.CharField(max_length=50, default="")
    dictionary=models.CharField(max_length=5000,default="")
    word_count=models.IntegerField(default=3)
    correct_words=models.CharField(max_length=1000,default="")
    