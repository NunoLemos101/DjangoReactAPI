from django.contrib import admin
from .models import Post , Message , LikeNotification , FollowNotification
 
admin.site.register(Post)
admin.site.register(Message)
admin.site.register(LikeNotification)
admin.site.register(FollowNotification)