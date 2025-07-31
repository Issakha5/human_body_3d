from rest_framework import viewsets
from .models import BodyPart, Annotation
from .serializers import BodyPartSerializer, AnnotationSerializer

class BodyPartViewSet(viewsets.ModelViewSet):
    queryset = BodyPart.objects.all()
    serializer_class = BodyPartSerializer

class AnnotationViewSet(viewsets.ModelViewSet):
    queryset = Annotation.objects.all()
    serializer_class = AnnotationSerializer
