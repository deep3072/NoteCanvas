from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import CustomUser
from django.contrib.auth.hashers import make_password
import json


def check(request):
    if request.user.is_authenticated:
        return JsonResponse({'message': 'User is authenticated'}, status=200)
    else:
        return JsonResponse({'message': 'User is not authenticated'}, status=200)

@csrf_exempt
def register(request):
    if request.user.is_authenticated:
        return redirect('index')
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(request.body)
            user = CustomUser.objects.create(
                username=data['signUpUsername'],
                email=data['signUpEmail'],
                full_name=data['signUpFullName'],
                password=make_password(data['signUpPassword']),
                # profile_picture=data['signUpProfilePic'] # todo: check if data contains signupProfilepic key then only access it
            )
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def loginPage(request):
    # print("in login")
    # print(request.user)
    # if request.user.is_authenticated:
    #     return redirect('index')
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            # print(email, password)
            User = get_user_model()
            try:
                username = User.objects.get(email=email) #get username from email
            except User.DoesNotExist:
                username = None
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                # print(request.user)
                return JsonResponse({'message': 'Login successful'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def logoutUser(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'}, status=200)
@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = CustomUser.objects.create(
                username=data['username'],
                email=data['email'],
                full_name=data.get('full_name', ''),
                password=make_password(data['password']),
            )
            if 'profile_picture' in data:
                user.profile_picture = data['profile_picture']
            user.save()
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def delete_user(request, user_id):
    if request.method == 'DELETE':
        try:
            user = CustomUser.objects.get(pk=user_id)
            user.delete()
            return JsonResponse({'message': 'User deleted successfully'}, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
@csrf_exempt
def update_user(request, user_id):
    if request.method == 'PUT':
        try:
            user = CustomUser.objects.get(pk=user_id)
            data = json.loads(request.body)
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)
            user.full_name = data.get('full_name', user.full_name)
            if 'profile_picture' in data:
                user.profile_picture = data['profile_picture']
            user.save()
            return JsonResponse({'message': 'User updated successfully'}, status=200)
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
