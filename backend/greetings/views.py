# greetings/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

greeted_names = []

@api_view(['POST'])
def greet(request):
    name = request.data.get('name')
    if name:
        greeting = f"Hello, {name}!"
        greeted_names.append(name)
        return Response({'greeting': greeting}, status=status.HTTP_200_OK)
    return Response({'error': 'Name is required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def names(request):
    return Response({'names': greeted_names}, status=status.HTTP_200_OK)
