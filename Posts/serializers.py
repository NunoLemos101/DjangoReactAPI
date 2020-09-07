from rest_framework import serializers
from Users.serializers import ProfileSerializer , ProfileWithEmailSerializer
from Users.models import Profile , FollowRequest
from .models import Post , Message , LikeNotification , FollowNotification
from django.db.models import Q

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
    image = serializers.SerializerMethodField(read_only=True)
    is_liked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Post
        fields = ['author' , 'id' , 'title' , 'content' , 'likes' , 'is_liked' , 'date_posted' , 'image']

    def get_likes(self , post):
        return post.likes.count()
    
    def get_is_liked(self , post):
        user = self.context.get("request_user")
        if user in post.likes.all():
            return True
        else:
            return False 
    def get_image(self , post):
        return post.author.profile.image.url

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

class FollowRequestForNotificationsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FollowRequest
        fields = ['accepted' , 'id']

class FollowNotificationSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(source="sender.profile" , read_only=True)
    sender_image = serializers.SerializerMethodField(read_only=True)
    receiver = ProfileSerializer(source="receiver.profile" , read_only=True)
    follow_request = FollowRequestForNotificationsSerializer(read_only=True)
    notification_type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = FollowNotification
        fields = ['sender' , 'receiver' , 'follow_request' , 'timestamp' , 'viewed' , 'notification_type' , 'sender_image' , 'id']

    def get_sender_image(self , obj):
        return obj.sender.profile.image.url

    def get_notification_type(self , obj):
        return 'follow'

class PostForNotificationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id']

class LikeNotificationSerializer(serializers.ModelSerializer):
    sender = ProfileSerializer(source="sender.profile" , read_only=True)
    sender_image = serializers.SerializerMethodField(read_only=True)
    receiver = ProfileSerializer(source="receiver.profile" , read_only=True)
    post = PostForNotificationsSerializer(read_only=True)
    notification_type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = LikeNotification
        fields = ['sender' , 'receiver' , 'post' , 'timestamp' , 'viewed' , 'notification_type' , 'sender_image']

    def get_sender_image(self , obj):
        return obj.sender.profile.image.url

    def get_notification_type(self , obj):
        return 'like'

class FollowRequestActionSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=True)
    action = serializers.ChoiceField(['accept' , 'deny'] , required=True)

class UsernameFromReactToDjangoSerializer(serializers.Serializer):
    username = serializers.IntegerField(required=True)

class MessageSerializer(serializers.ModelSerializer):
    last_message_from_loggedIn_user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Message
        fields = ['text' , 'viewed' , 'last_message_from_loggedIn_user']

    def get_last_message_from_loggedIn_user(self , message):
        loggedIn_user = self.context.get("request_user")
        if message.sender == loggedIn_user:
            return True
        else: return False


class LatestMessageSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(source="user.profile" , read_only=True)
    latest_message = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['id' , 'image' , 'user' , 'latest_message']

    def get_latest_message(self , profile):
        user = self.context.get('request_user')
        message = Message.objects.filter(receiver=user , sender=profile.user).last()
        message = Message.objects.filter(Q(receiver=user , sender=profile.user) | Q(receiver=profile.user , sender=user)).distinct().order_by("-timestamp").first()
        return MessageSerializer(message , context={"request_user" : user}).data