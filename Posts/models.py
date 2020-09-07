from django.db import models
from Users.models import FollowRequest
from django.utils import timezone
from django.contrib.auth.models import User

class Post(models.Model):
    title = models.CharField(max_length=20)
    content = models.TextField()
    date_posted = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User , on_delete=models.CASCADE)
    likes = models.ManyToManyField(User , related_name="likes" , blank=True)

class Message(models.Model):
    sender = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_message_sender")
    receiver = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_message_receiver")
    text = models.TextField(null=False , blank=False)
    image = models.ImageField(default=None , blank=True)
    timestamp = models.DateTimeField(default=timezone.now)
    viewed = models.BooleanField(default=False)

class LikeNotification(models.Model):
    sender = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_like_sender")
    receiver = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_like_receiver")
    post = models.ForeignKey(Post , on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
    viewed = models.BooleanField(default=False)

    def __str__(self):
        return '{} liked {} (Notification)'.format(self.sender , self.post)

class FollowNotification(models.Model):
    sender = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_follow_sender")
    receiver = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_follow_receiver")
    follow_request = models.ForeignKey(FollowRequest , on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=timezone.now)
    viewed = models.BooleanField(default=False)