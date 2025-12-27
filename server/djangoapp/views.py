from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
import logging
import json

# Get an instance of a logger
logger = logging.getLogger(__name__)


# -------------------------------
# LOGIN VIEW
# -------------------------------
@csrf_exempt
def login_user(request):
    data = json.loads(request.body)
    username = data['userName']
    password = data['password']

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        data = {"userName": username, "status": "Authenticated"}
    else:
        data = {"userName": "", "status": "Unauthorized"}

    return JsonResponse(data)


# -------------------------------
# LOGOUT VIEW
# -------------------------------
def logout_request(request):
    logout(request)
    data = {"userName": ""}
    return JsonResponse(data)


# -------------------------------
# PLACEHOLDERS (LAB STEPS)
# -------------------------------

# @csrf_exempt
# def registration(request):
#     pass

# def get_dealerships(request):
#     pass

# def get_dealer_reviews(request, dealer_id):
#     pass

# def get_dealer_details(request, dealer_id):
#     pass

# def add_review(request):
#     pass
