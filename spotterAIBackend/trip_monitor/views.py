
import traceback
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Trip, Stop, ELDLog
from .serializers import TripSerializer, ELDLogSerializer
from .services import get_route_details, calculate_stops, generate_eld_logs
from datetime import datetime
from rest_framework import viewsets

class ELDLogViewSet(viewsets.ModelViewSet):
    queryset = ELDLog.objects.all()
    serializer_class = ELDLogSerializer

def home(request):
     return HttpResponse("welcome")

@api_view(['POST'])
def create_trip(request):
    try:
        """Accept trip details, calculate route, determine stops, and generate ELD logs."""
        print(f"Request Data: {request.data}")
        serializer = TripSerializer(data=request.data)
        
        
        if serializer.is_valid():
            print("serializer is valid")
        
            trip = serializer.save()
            print(trip)
            # Get route details
            print(request.data['current_location'], request.data['dropoff_location'])
            route_data = get_route_details(request.data['current_location'], request.data['dropoff_location'])
        # route_data = get_route_details(start, end)
            if not route_data:
                return Response({"error": "Failed to fetch route"}, status=500)

            
            distance_miles = route_data["routes"][0]["distance"] * 0.000621371
            estimated_time_hours = route_data["routes"][0]["duration"] / 3600
            print(f"distance miles {distance_miles}")
            print(f"estimatesd time hours {estimated_time_hours}")

            # Compute stops
            stops = calculate_stops(distance_miles)
            for stop in stops:
                Stop.objects.create(trip=trip, location=f"Mile {stop['mile_marker']}", reason=stop["reason"])

            # Generate ELD logs
            eld_logs = generate_eld_logs(estimated_time_hours)
            ELDLog.objects.create(trip=trip, date=datetime.now().date(), log_data=eld_logs)

            return Response({
                "trip_id": trip.id,
                "route": {
                    "distance_miles": round(distance_miles, 2),
                    "estimated_time_hours": round(estimated_time_hours, 2),
                    # "waypoints": route_data["routes"][0]["waypoints"]["location"]
                },
                "stops": stops,
                "eld_logs": eld_logs
            })

        return Response(serializer.errors, status=400)

    except Exception as e:
            print("Error in create_trip:", str(e))
            traceback.print_exc()
            return JsonResponse({"error": "Internal server error", "details": str(e)}, status=500)
