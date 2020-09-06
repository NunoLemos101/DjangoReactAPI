from rest_framework import serializers
from .models import Profile , FollowRequest

class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    followers_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['first_name' , 'last_name' , 'username' , 'id' , 'followers_count' , 'following_count']

    def get_first_name(self , profile):
        return profile.user.first_name

    def get_last_name(self , profile):
        return profile.user.last_name

    def get_username(self , profile):
        return profile.user.username

    def get_followers_count(self , profile):
        return FollowRequest.objects.filter(receiver=profile.user , accepted=True).count()

    def get_following_count(self , profile):
        return FollowRequest.objects.filter(sender=profile.user , accepted=True).count()

class ProfileWithEmailSerializer(serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()
    email_address = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['first_name' , 'last_name' , 'username' , 'email_address' , 'id' , 'followers_count' , 'following_count']

    def get_first_name(self , profile):
        return profile.user.first_name

    def get_last_name(self , profile):
        return profile.user.last_name

    def get_username(self , profile):
        return profile.user.username

    def get_email_address(self , profile):
        return profile.user.email

    def get_followers_count(self , profile):
        return FollowRequest.objects.filter(receiver=profile.user , accepted=True).count()

    def get_following_count(self , profile):
        return FollowRequest.objects.filter(sender=profile.user , accepted=True).count()