from django.db import models

class Users(models.Model):
    name = models.CharField("Name", max_length=320)