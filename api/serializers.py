from rest_framework import serializers
from .models import Sprint, Tag, Task
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        # パスワードは書き込みのみかつ入力必須
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    # ハッシュ化されたパスワードをDBに
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        #トークンが自動生成される
        Token.objects.create(user=user)
        return user


class SprintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprint
        fields = ('id', 'sprint')


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'tag')


class TaskSerializer(serializers.ModelSerializer):
    # 外部キー
    targetsprint = SprintSerializer(read_only=True)
    targettag = TagSerializer(read_only=True)
    responsible = UserSerializer(read_only=True)

    #プライマリーキー(スプリント,タグ,レスポンシブ)
    sprint_pk_id = serializers.PrimaryKeyRelatedField(
        queryset=Sprint.objects.all(), write_only=True)
    tag_pk_id = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(), write_only=True)
    responsible_pk_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True)

    class Meta:
        model = Task
        fields = ('id', 'targetsprint', 'task', 'description', 'criteria', 'responsible', 'estimate',
                  'targettag', 'status', 'sprint_pk_id', 'tag_pk_id', 'responsible_pk_id', 'created_at', 'updated_at')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        validated_data['targetsprint'] = validated_data.get(
            'sprint_pk_id', None)
        validated_data['targettag'] = validated_data.get('tag_pk_id', None)
        validated_data['responsible'] = validated_data.get(
            'responsible_pk_id', None)

        del validated_data['sprint_pk_id']
        del validated_data['tag_pk_id']
        del validated_data['responsible_pk_id']

        return Task.objects.create(**validated_data)

    def update(self, instance, validated_data):
        validated_data['targetsprint'] = validated_data.get(
            'sprint_pk_id', None)
        validated_data['targettag'] = validated_data.get('tag_pk_id', None)
        validated_data['responsible'] = validated_data.get(
            'responsible_pk_id', None)

        instance.targetsprint = validated_data.get(
            'targetsprint', instance.targetsprint)
        instance.task = validated_data.get('task', instance.task)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.responsible = validated_data.get(
            'responsible', instance.responsible)
        instance.estimate = validated_data.get('estimate', instance.estimate)
        instance.targettag = validated_data.get(
            'targettag', instance.targettag)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

