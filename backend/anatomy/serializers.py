from rest_framework import serializers
from .models import BodyPart, Annotation

class AnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annotation
        fields = '__all__'

class BodyPartSerializer(serializers.ModelSerializer):
    annotations = AnnotationSerializer(many=True, read_only=True)
    class Meta:
        model = BodyPart
        fields = ['id', 'name', 'system', 'model_file', 'description', 'annotations']
