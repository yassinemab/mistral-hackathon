from django.urls import path
from .views.PostDataView import PostDataDB

urlpatterns = [
    # path('post/', PostViewSet.as_view({'get': 'getPosts', "post": "insertPost", "delete": "deletePost"})),
    path('get_data/', PostDataDB.as_view({"get": "getRecords"})),
    path('post_data/', PostDataDB.as_view({"post": "PostData"})),
    path('post_pdf/', PostDataDB.as_view({"post": "PostPDF"})),
]