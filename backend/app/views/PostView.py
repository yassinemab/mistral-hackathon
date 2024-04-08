from rest_framework import viewsets
from rest_framework.exceptions import ParseError
from ..models import Post
from rest_framework.response import Response


class PostViewSet(viewsets.ViewSet):
    def getPosts(self, request):
        posts = Post.objects.all()

        return Response({
            "success": "true",
            "posts": [post.serialize() for post in posts]
        })

    def insertPost(self, request):
        title = request.data["title"]
        description = request.data["description"]

        Post.objects.create(title=title, description=description)

        # TODO: ADD THE TASK TO SEND IT BACK TO THE FRONTEND WITH A SOCKET

        return Response({
            "success": "true"
        })

    def deletePost(self, request):
        post_id = request.GET['post_id']

        post = Post.objects.filter(id=post_id).first()

        if not post:
           raise ParseError({
              "error": "Post not found"
           })

        post.delete()

        return Response({
           "success": "true"
        })