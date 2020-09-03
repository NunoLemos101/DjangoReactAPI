from django.shortcuts import render , redirect 
from django.contrib import messages
from .forms import UserRegisterForm
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login , logout
from Posts.models import FollowNotification , LikeNotification
from Users.models import Profile , User

# Create your views here.

def register_view(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your account has been created! You are now able to log in')
            return redirect('login-view')
    else:
        form = UserRegisterForm()
    return render(request, 'authentication/register.html', {'form': form})

def login_view(request):
    if not request.user.is_authenticated:
        form = AuthenticationForm(request, data=request.POST or None)
        if form.is_valid() and request.method == "POST":
            userFormData = form.get_user()
            login(request, userFormData)
            return redirect("/")
        context = {
            "form": form,
        }
        return render(request, "authentication/login.html", context)
    return redirect("/")

def logout_view(request):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    return render(request , "authentication/logout.html")

def profile_view(request , username):
    if request.user.username == username:
        is_owner = True
    else:
        is_owner = False
    React_Dataset = {
        'is_owner' : is_owner ,
        'username' : username ,
    }
    if request.user:
        follow_notification_count = FollowNotification.objects.filter(receiver=request.user , viewed=False).count()
        like_notification_count = LikeNotification.objects.filter(receiver=request.user , viewed=False).count()
        React_Dataset = {
            'is_owner' : is_owner ,
            'username' : username ,
            'notification_count' : follow_notification_count + like_notification_count,
        }
    return render(request , 'pages/profile.html' , React_Dataset)

def my_profile(request):
    React_Dataset = {
        'sidebar_option' : 'editprofile',
        'view' : 'profile-settings',
    }
    return render(request , "pages/my-profile.html" , React_Dataset)