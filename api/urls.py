from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet, SprintViewSet, TagViewSet, TaskViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('sprints', SprintViewSet)
router.register('tags', TagViewSet)
router.register('tasks', TaskViewSet)

urlpatterns = [
    path('',include(router.urls)),
]