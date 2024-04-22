from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login/", views.loginPage, name="login"),
    path("logout/", views.logoutUser, name="logout"),
    path("check/", views.check, name="check"),
    path("add", views.delete_user, name="delete_user"),
    path("update", views.update_user, name="update_user"),
         
]