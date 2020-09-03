from rest_framework import serializers
from Users.serializers import ProfileSerializer , ProfileWithEmailSerializer
from Users.models import Profile , FollowRequest
from .models import Post , LikeNotification , FollowNotification

class PostSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(source="author.profile" , read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['author' , 'id' , 'image' , 'title' , 'content' , 'likes' , 'is_liked' , 'date_posted']

    def get_image(self , post):
        return post.author.profile.image.url

    def get_likes(self , post):
        return post.likes.count()

    def get_is_liked(self , post):
        user = self.context.get("request_user")
        if user in post.likes.all():
            return True
        else:
            return False 

class PostCreateSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(source="author.profile" , read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['author' , 'id' , 'title' , 'content' , 'likes' , 'is_liked' , 'date_posted']

    def get_likes(self , post):
        return post.likes.count()
    
    def get_is_liked(self , post):
        user = self.context.get("request_user")
        if user in post.likes.all():
            return True
        else:
            return False 

    def get_author(self , post):
        return post.author.id

class ProfileSettingsSerializer(serializers.ModelSerializer):
    user = ProfileWithEmailSerializer(source="user.profile" , read_only=True)

    class Meta:
        model = Profile
        fields = ['user' , 'biography' , 'image' , 'isPrivate']

class ProfileSettingsFormSerializer(serializers.Serializer):
    username = serializers.CharField()
    biography = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()    
    email_address = serializers.CharField()  
    isprivate = serializers.BooleanField(allow_null=True)
    image = serializers.FileField(required=False)


class AuthorizedProfileSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(source="user.profile" , read_only=True)
    follow_status = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['user' , 'biography' , 'image' , 'isPrivate' , 'follow_status']
    
    def get_follow_status(self , profile):
        visiter = self.context.get("request_user")
        if not visiter:
            return None
        elif visiter.pk == profile.user.pk:
            return "is_owner"  
        elif FollowRequest.objects.filter(sender=visiter , receiver=profile.user , accepted=True).exists():
            return "following"
        elif FollowRequest.objects.filter(sender=visiter , receiver=profile.user , accepted=False).exists():
            return "sent"
        elif FollowRequest.objects.filter(sender=visiter , receiver=profile.user).count() == 0:
            return "not_sent"

class PostLikeSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    content = serializers.CharField(allow_blank=True , required=False)

class FollowUnfollowRequestSerializer(serializers.Serializer):
    receiver_id = serializers.IntegerField()
    content = serializers.CharField(allow_blank=True , required=False)
