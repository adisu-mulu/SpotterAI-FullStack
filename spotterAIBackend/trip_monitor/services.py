import requests
from datetime import datetime, timedelta
from .models import Stop, ELDLog

# ORS_API_KEY = "5b3ce3597851110001cf62484eeb9202d7e747c98e88c53dea0dc403"
# OSRM does not require an API key, but it has rate limits if you're using their public servers.
OSRM_URL = "http://router.project-osrm.org/route/v1/driving"

def get_route_details(start, end):
    """Fetch route details (distance, duration, waypoints) from OpenRouteService API."""
    url = f"{OSRM_URL}/{start[0]},{start[1]};{end[0]},{end[1]}"
    params = {
        # "api_key": ORS_API_KEY,
        # "start": start,
        # "end": end
        "overview": "false",  # Option to reduce the data returned
        # "geometries": "polyline",  # The format for the route geometry

    }
    response = requests.get(url, params=params)
    print(response)
    return response.json() if response.status_code == 200 else None

def calculate_stops(distance_miles):
    """Determine fuel stops (~1,000 miles) and rest breaks (HOS rules)."""
    fuel_stops = [i for i in range(1000, int(distance_miles), 1000)]
    rest_stops = [i for i in range(8 * 60, int(distance_miles / 60) * 60, 8 * 60)]
    
    stops = []
    for mile in fuel_stops:
        stops.append({"mile_marker": mile, "reason": "Fuel Stop"})
    for minute in rest_stops:
        stops.append({"mile_marker": minute / 60 * 60, "reason": "Rest Break"})
    
    return stops

def generate_eld_logs(total_hours):
    """Generate ELD logs with driving, rest, and off-duty periods."""
    logs = []
    start_time = datetime.now().replace(hour=8, minute=0, second=0)
    current_time = start_time

    while total_hours > 0:
        if total_hours >= 8:
            logs.append({"time": current_time.strftime("%H:%M"), "status": "Driving"})
            current_time += timedelta(hours=8)
            logs.append({"time": current_time.strftime("%H:%M"), "status": "Rest Break"})
            current_time += timedelta(minutes=30)
            total_hours -= 8.5
        elif total_hours > 0:
            logs.append({"time": current_time.strftime("%H:%M"), "status": "Driving"})
            current_time += timedelta(hours=total_hours)
            total_hours = 0

    logs.append({"time": current_time.strftime("%H:%M"), "status": "Off-Duty"})
    return logs
