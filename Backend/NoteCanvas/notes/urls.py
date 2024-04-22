from django.urls import path
from . import views
import uuid

urlpatterns = [
    path('create/<uuid:canvas_id>/', views.create_note, name='create_note'),
    path('delete/<uuid:note_id>/', views.delete_note, name='delete_note'),
    path('update/<uuid:note_id>/', views.update_note, name='update_note'),
    path('pin/<uuid:note_id>/', views.pin_note, name='pin_note'),
]
