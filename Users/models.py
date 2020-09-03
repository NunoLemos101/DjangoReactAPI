from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from PIL import Image

class Profile(models.Model):
    user = models.OneToOneField(User , on_delete=models.CASCADE)
    image = models.ImageField(default="default.jpg" , upload_to="profile_pics")
    isPrivate = models.BooleanField(default=False)
    biography = models.TextField(max_length=150 , default="" , blank=True)

    def save(self, *args, **kwargs):
        super(Profile, self).save(*args, **kwargs)
    
        image = Image.open(self.image.path)

        if image.height > 300 or image.width > 300:
            output_size = (300 , 300)
            image.thumbnail(output_size)
            image.save(self.image.path)

    def __str__(self):
        return "{}'s Profile".format(self.user.username)

class FollowRequest(models.Model):
    sender = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_sender")
    receiver = models.ForeignKey(User , on_delete=models.CASCADE , related_name="user_receiver")
    accepted = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.accepted == True:
            return '{} is following {}'.format(self.sender , self.receiver)
        elif self.accepted == False:
            return '{} wants to follow {}'.format(self.sender , self.receiver)
                

def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)

post_save.connect(user_did_save, sender=User)