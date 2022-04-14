from rest_framework import serializers
from documents.models import SentimentModel

class SentimentSerializer(serializers.ModelSerializer):
    class Meta:
        model=SentimentModel
        fields=('query_string','raw_score','sentiment')
        read_only_fields=('raw_score','sentiment')