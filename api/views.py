from django.contrib.auth.models import User
from rest_framework import viewsets
from .models import Sprint, Tag, Task
from .serializers import UserSerializer, SprintSerializer, TagSerializer, TaskSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    #誰でもアクセスできるよ
    permission_classes = (AllowAny,)

class SprintViewSet(viewsets.ModelViewSet):
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all().order_by('-id')
    serializer_class = TaskSerializer

    #ここのviewはログインしトークンを持ってないと使えない
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
