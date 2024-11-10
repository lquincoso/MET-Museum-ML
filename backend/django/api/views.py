from django.shortcuts import render
from django.http import JsonResponse
from django.db import IntegrityError
from api.models import User, ArtworkRating
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, ArtworkRatingSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, viewsets, permissions, status
from rest_framework.permissions import AllowAny, IsAuthenticated


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class ArtworkRatingViewSet(viewsets.ModelViewSet):
    queryset = ArtworkRating.objects.all()
    serializer_class = ArtworkRatingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request):
        user = request.user
        artwork_id = request.data.get('artwork_id')
        rating = request.data.get('rating')

        if artwork_id is None or rating is None:
            return Response({'error': 'Artwork ID and rating are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create or update the rating
            rating_obj, created = ArtworkRating.objects.update_or_create(
                user=user,
                artwork_id=artwork_id,
                defaults={'rating': rating}
            )

            message = "Rating created successfully" if created else "Rating updated successfully"
            serializer = ArtworkRatingSerializer(rating_obj)
            return Response({'message': message, 'rating': serializer.data}, status=status.HTTP_200_OK)

        except IntegrityError:
            return Response(
                {'error': 'Duplicate rating for this artwork.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/ratings/'
    ]
    return Response(routes)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_artwork(request):
    user = request.user
    artwork_id = request.data.get('artwork_id')
    rating = request.data.get('rating')

    if artwork_id is None or rating is None:
        return Response({'error': 'Artwork ID and rating are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Check if a rating by this user for this artwork already exists
        artwork_rating, created = ArtworkRating.objects.update_or_create(
            user=user,
            artwork_id=artwork_id,
            defaults={'rating': rating}
        )

        message = "Rating created successfully" if created else "Rating updated successfully"
        serializer = ArtworkRatingSerializer(artwork_rating)
        return Response({'message': message, 'rating': serializer.data}, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"{request.user} API responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.data.get('text')  # Use request.data for POST data
        data = f'API just responded to POST request: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)
