from django.urls import path
from . import views


urlpatterns = [
    path('get/<uuid:canvas_id>/', views.get_notes_on_canvas,
         name='get_notes_on_canvas'),
    path('create/', views.create_canvas, name='create_canvas'),
    path('delete/<uuid:canvas_id>/', views.delete_canvas, name='delete_canvas'),
    path('update/<uuid:canvas_id>/', views.update_canvas, name='update_canvas')
]
