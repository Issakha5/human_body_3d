from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BodyPartViewSet, AnnotationViewSet

router = DefaultRouter()
router.register(r'body-parts', BodyPartViewSet)
router.register(r'annotations', AnnotationViewSet)

urlpatterns = router.urls

