from django.urls import path , include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('settings', views.ProfileViewSet ,  basename='MyModel')

urlpatterns = [
    path('posts/' , views.post_list_view),
    path('posts/like/' , views.post_like_view),
    path('posts/create/' , views.post_create_view),
    path('profile/<str:username>/' , views.profile_view , name='profile-view'),  
    path('profile-follow/' , views.follow_unfollow_view),
    #path('myprofile/' , views.profile_settings_view)
    path('myprofile/' , include(router.urls)),
    path('notification-count/' , views.get_notification_number_view),
]
