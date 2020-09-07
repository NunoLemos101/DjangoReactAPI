from rest_framework.decorators import api_view , permission_classes , authentication_classes , renderer_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from Posts.models import Post , Message ,LikeNotification , FollowNotification
from Posts.serializers import ( PostSerializer ,
                                AuthorizedProfileSerializer , 
                                ProfileSettingsSerializer , 
                                ProfileSettingsFormSerializer , 
                                PostLikeSerializer , 
                                PostCreateSerializer , 
                                FollowUnfollowRequestSerializer , 
                                FollowNotificationSerializer , 
                                LikeNotificationSerializer ,
                                FollowRequestActionSerializer ,
                                LatestMessageSerializer,
                                UsernameFromReactToDjangoSerializer,)
from Users.models import FollowRequest , Profile , User
from Users.serializers import ProfileWithEmailSerializer
from functions.posts_pagination import get_paginated_queryset_response
from functions.validate_user_update_data import validateUserUpdateData
from rest_framework import viewsets
from django.db.models import Q

@api_view(['GET'])
def post_list_view(request):
    if request.user.is_authenticated:
        users = []
        followingUsers = FollowRequest.objects.filter(sender=request.user , accepted=True)
        for follow in followingUsers:
            users.append(follow.receiver)
        all_posts = Post.objects.filter(Q(author__in=users) | Q(author=request.user)).distinct().order_by("-date_posted")
    else:
        all_posts = Post.objects.filter(author__profile__isPrivate=False).order_by("-date_posted")
    return get_paginated_queryset_response(all_posts , request)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_like_view(request):
    serializer = PostLikeSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        post_id = data.get("id")
        if Post.objects.filter(pk=post_id).count() > 0 :#and FollowRequest.objects.filter(sender=request.user , receiver=Post.objects.filter(pk=post_id).first().author , accepted=True).exists():
            post = Post.objects.get(pk=post_id)
            if request.user in post.likes.filter(id=request.user.id):
                post.likes.remove(request.user)
                LikeNotification.objects.filter(sender=request.user , receiver=post.author , post=post).delete()
                return Response(PostSerializer(post , context={"request_user" : request.user}).data , 200)
            else:
                post.likes.add(request.user)
                if request.user != post.author:
                    LikeNotification.objects.create(sender=request.user , receiver=post.author , post=post)
                return Response(PostSerializer(post , context={"request_user" : request.user}).data , 200)
        else: return Response({} , 404)
    else: return Response({} , 400)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def post_create_view(request):
    if request.user.is_authenticated:
        serializer = PostCreateSerializer(data=request.data , context={"request_user" : request.user})
        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user)
            return Response(serializer.data , 201)
        return Response({} , 400)
    return Response({} , 401)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request , username):
    if User.objects.filter(username=username).exists():
        user = User.objects.get(username=username)
        if user.profile.isPrivate == False or FollowRequest.objects.filter(sender=request.user , receiver=user , accepted=True).exists():
            return Response(AuthorizedProfileSerializer(user.profile , context={"request_user" : request.user}).data , 200)
        else:
            return Response(AuthorizedProfileSerializer(user.profile , context={"request_user" : request.user}).data , 200)

@ api_view(['GET' , 'POST'])
@renderer_classes(["MultiPartParser"])
@permission_classes([IsAuthenticated])
def profile_settings_view(request):
    if request.method == "POST" and request.user.is_authenticated:
            serializer = ProfileSettingsFormSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                data = serializer.data
                username_data = data.get("username")
                biography_data = data.get("biography")
                first_name_data = data.get("first_name")
                last_name_data = data.get("last_name")
                email_address_data = data.get("email_address")
                is_private_data = data.get("isprivate")
                image_data = data.get('image')
                if is_private_data == None or image_data == None:
                    is_private_data = request.user.profile.isPrivate
                    image_data = request.user.profile.image
                if len(username_data) < 20 and len(first_name_data) < 20 and len(last_name_data) < 20 and len(biography_data) < 150:
                    if User.objects.filter(email=email_address_data).count() == 1 and User.objects.get(email=email_address_data).id == request.user.id:
                        request.user.username = username_data
                        request.user.profile.biography = biography_data
                        request.user.first_name = first_name_data
                        request.user.last_name = last_name_data
                        request.user.email = email_address_data
                        request.user.profile.isPrivate = is_private_data
                        request.user.profile.image = image_data
                        request.user.save()
                        request.user.profile.save()
                        return Response(ProfileSettingsSerializer(request.user.profile , context={"request_user" : request.user}).data , 201)
                    elif User.objects.filter(email=email_address_data).count() == 0:
                        request.user.username = username_data
                        request.user.profile.biography = biography_data
                        request.user.first_name = first_name_data
                        request.user.last_name = last_name_data
                        request.user.email = email_address_data
                        request.user.profile.isPrivate = is_private_data
                        request.user.save()
                        request.user.profile.save()
                        return Response(ProfileSettingsSerializer(request.user.profile , context={"request_user" : request.user}).data , 201)           
                    else:
                        return Response({"message" : "Email is already taken"} , 403)
                    
                else: return Response({"Some fields have more characters than they should have"} , 400)
    elif request.method == "GET" and request.user.is_authenticated:
            return Response(ProfileSettingsSerializer(request.user.profile , context={"request_user" : request.user}).data , 200)
    else: return Response({} , 403)
# {"username" : "admin", "biography": "admin", "first_name": "Nuno", "last_name": "Lemos", "email_address": "admin@gmail.com"}

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def follow_unfollow_view(request):
    serializer = FollowUnfollowRequestSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        sender_user_list = []

        data = serializer.validated_data
        receiver_id = data.get("receiver_id")
        user_receiver = User.objects.get(pk=receiver_id)
        for followRequest in FollowRequest.objects.filter(sender=request.user , receiver=user_receiver):
            sender_user_list.append(followRequest.sender)

        if user_receiver != request.user and request.user.is_authenticated:
            if user_receiver.profile.isPrivate == True:
                if request.user in sender_user_list:
                    FollowRequest.objects.get(sender=request.user , receiver=user_receiver).delete()
                else:
                    FollowRequest.objects.create(sender=request.user , receiver=user_receiver , accepted=False)
                    follow_request = FollowRequest.objects.get(sender=request.user , receiver=user_receiver , accepted=False)
                    FollowNotification.objects.create(sender=request.user , receiver=user_receiver , follow_request=follow_request)
            else:
                if request.user in sender_user_list:
                    FollowRequest.objects.filter(sender=request.user , receiver=user_receiver).delete()
                    FollowNotification.objects.filter(sender=request.user , receiver=user_receiver).delete()
                else:  
                    FollowRequest.objects.create(sender=request.user , receiver=user_receiver , accepted=True)      
            return Response(AuthorizedProfileSerializer(user_receiver.profile , context={"request_user" : request.user}).data , 200)
        else: return Response({} , 403)
    else: return Response({} , 400)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def follow_notifications_action(request):
    serializer = FollowRequestActionSerializer(data=request.data)
    if request.method == "POST" and serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        id = data.get('id')
        action = data.get('action')
        follow = FollowNotification.objects.get(pk=id)
        if request.user == follow.receiver:
            if action == 'accept':
                follow.follow_request.accepted = True
                follow.save()
                follow.follow_request.save()
                return Response(FollowNotificationSerializer(follow).data , 200)
            elif action == 'deny':
                follow.follow_request.delete()
                follow.delete()
                return Response({'message' : 'Action completed successfully'} , 200)


    return Response(FollowRequestActionSerializer().data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_follow_notifications_view(request):
    queryset = FollowNotification.objects.filter(receiver=request.user).order_by('-timestamp')
    return Response(FollowNotificationSerializer(queryset , many=True).data , 200)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_like_notifications_view(request):
    queryset = LikeNotification.objects.filter(receiver=request.user).order_by('-timestamp')
    return Response(LikeNotificationSerializer(queryset , many=True).data , 200)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_notification_number_view(request):
    like_notification_count = LikeNotification.objects.filter(receiver=request.user , viewed=False).count()
    follow_notification_count = FollowNotification.objects.filter(receiver=request.user , viewed=False).count()
    Data = {
        'like_notification_count' : like_notification_count ,
        'follow_notification_count' : follow_notification_count ,
        'notifications' : like_notification_count + follow_notification_count
    } 
    return Response(Data , 200)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_latest_messages_view(request):
    message_queryset = Message.objects.filter(Q(receiver=request.user) | Q(sender=request.user)).distinct()
    profile_list = []
    for message in message_queryset:
        if message.sender.profile not in profile_list:
            profile_list.append(message.sender.profile)
    profile_list.remove(request.user.profile)
    return Response(LatestMessageSerializer(profile_list , context={'request_user' : request.user} , many=True).data , 200)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_private_message_view(request):
    return Response({"username" : request.data} , 200)

class ProfileViewSet(viewsets.ModelViewSet):

    def get_queryset(self):
        print(self.request.user)
        return Profile.objects.filter(user=self.request.user)
    
    def create(self , request):
        if self.request.user:
            serializer = ProfileSettingsFormSerializer(data=self.request.data)
            if serializer.is_valid(raise_exception=True):
                data = serializer.validated_data
                username = data.get('username')
                biography = data.get('biography')
                first_name = data.get('first_name')
                last_name = data.get('last_name')
                email_address = data.get('email_address')
                isprivate = data.get('isprivate')
                if isprivate == None:
                    isprivate = request.user.profile.isPrivate
                image = data.get('image')
                if image == None:
                    image = request.user.profile.image
                request.user.username = username
                request.user.profile.biography = biography
                request.user.first_name = first_name
                request.user.last_name = last_name
                request.user.email = email_address
                request.user.profile.image = image
                request.user.profile.isPrivate = isprivate
                request.user.save()
                request.user.profile.save()

                return Response(ProfileSettingsSerializer(self.request.user.profile).data , 200)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ProfileSettingsSerializer
        else:
            return ProfileSettingsFormSerializer

    def post(self, request, *args, **kwargs):
        isprivate = request.data['isprivate']
        biography = request.data['biography']
        image = request.data['image']
        print(image)
        return Response({} , status=200)
       
    def get(self , request , *args, **kwargs):
        return Response({} , status=200)

