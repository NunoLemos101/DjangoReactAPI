from django.contrib.auth.models import User
from Posts.models import Post
import string
import random

def GenerateRandomPosts(numberOfPosts):
    user = User.objects.all()[random.randint(0 , User.objects.all().count() - 1)]
    def get_random_string(length):
        letters = string.ascii_lowercase
        result_str = ''.join(random.choice(letters) for i in range(length))
        return result_str
    for i in range(numberOfPosts):
        Post.objects.create(author=user , title=get_random_string(random.randint(5 , 29)) , content=get_random_string(random.randint(30 , 400)))