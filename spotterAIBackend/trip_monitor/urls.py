"""
URL configuration for spotterAIBackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from trip_monitor.views import generate_eld_logs, create_trip, home
from rest_framework.routers import DefaultRouter
from .views import ELDLogViewSet

router = DefaultRouter()
router.register(r'eldlogs', ELDLogViewSet)

urlpatterns = [
    path('', home),
    path('generate_eld_log/', generate_eld_logs, name='generate_eld_log'),
    path("api/trips/create/", create_trip, name="create_trip"),
    path('api/', include(router.urls)),

]
