from rest_framework import serializers
from .models import User, Book
from django.contrib.auth.hashers import make_password


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        # validated_data contains incoming JSON data
        validated_data['password'] = make_password(
            validated_data['password']
        )
        # converts plain password → hashed password

        return super().create(validated_data)
    

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()