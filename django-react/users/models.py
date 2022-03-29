from django.db import models

class User(models.Model):
    name = models.CharField("Name", max_length=320)