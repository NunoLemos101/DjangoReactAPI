from rest_framework.pagination import PageNumberPagination
from Posts.serializers import PostSerializer

def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = PostSerializer(paginated_qs, many=True , context={"request_user" : request.user})
    return paginator.get_paginated_response(serializer.data) # Response( serializer.data, status=200)

