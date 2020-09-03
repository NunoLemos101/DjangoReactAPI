from django.urls import path
from . import views as user_views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('login/' , user_views.login_view , name="login-view"),
    path('register/' , user_views.register_view , name="register-view"),
    path('logout/' , user_views.logout_view , name="logout-view"),
    path('my-profile/settings/' , user_views.my_profile , name='myprofile-view'),
    path('profile/<str:username>/' , user_views.profile_view , name='profile-view'),  
]
