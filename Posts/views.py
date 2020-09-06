from django.shortcuts import render
from Posts.models import FollowNotification , LikeNotification
from django.contrib.auth.decorators import login_required , permission_required

# Create your views here.

@login_required    
def home_view(request):
    React_Dataset = {
        'sidebar_option' : 'latestPosts',
        'view' : 'home',
    }
    if request.user:
        follow_notification_count = FollowNotification.objects.filter(receiver=request.user , viewed=False).count()
        like_notification_count = LikeNotification.objects.filter(receiver=request.user , viewed=False).count()
        React_Dataset = {
            'sidebar_option' : 'latestPosts',
            'view' : 'home',
            'notification_count' : str(follow_notification_count + like_notification_count),
        } 
    return render(request, 'pages/home.html', React_Dataset)

@login_required    
def notifications_view(request):
    React_Dataset = {
        'sidebar_option' : 'notifications',
        'view' : 'home',
    }
    for like_notification in LikeNotification.objects.filter(receiver=request.user , viewed=False):
        like_notification.viewed = True
        like_notification.save()
    for follow_notification in FollowNotification.objects.filter(receiver=request.user , viewed=False):
        follow_notification.viewed = True
        follow_notification.save()
        
    return render(request, 'pages/notifications.html', React_Dataset)

@login_required    
def messages_view(request):
    React_Dataset = {
        'sidebar_option' : 'messages',
        'view' : 'home',
    }
    if request.user:
        follow_notification_count = FollowNotification.objects.filter(receiver=request.user , viewed=False).count()
        like_notification_count = LikeNotification.objects.filter(receiver=request.user , viewed=False).count()
        React_Dataset = {
            'sidebar_option' : 'messages',
            'view' : 'home',
            'notification_count' : follow_notification_count + like_notification_count,
        }
    return render(request, 'pages/messages.html', React_Dataset)

@login_required    
def post_detail_view(request, pk):
    if request.user:
        follow_notification_count = FollowNotification.objects.filter(receiver=request.user , viewed=False).count()
        like_notification_count = LikeNotification.objects.filter(receiver=request.user , viewed=False).count()
        React_Dataset = {
            'sidebar_option' : 'messages',
            'view' : 'home',
            'notification_count' : follow_notification_count + like_notification_count,
        }
    return render(request, 'pages/post_detail.html')
