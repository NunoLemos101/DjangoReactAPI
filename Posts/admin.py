from django.contrib import admin
from .models import Post , LikeNotification , FollowNotification

admin.site.register(Post)
admin.site.register(LikeNotification)
admin.site.register(FollowNotification)