from rest_framework import viewsets
from rest_framework.exceptions import ParseError
from ..models import Post
from rest_framework.response import Response
from functions.load_pdf import read_pdf


class Document(viewsets.ViewSet):
    def getPDF(self, request):
        document = request.data['content']
        read_pdf(document=document)

        return Response({
           "success": "true"
        })