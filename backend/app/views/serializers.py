from rest_framework import serializers
from ..models import DocumentDetails

class DocumentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentDetails
        fields = '__all__'  # Or a list of the fields you want to include.