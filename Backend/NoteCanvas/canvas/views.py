from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from .models import Canvas
from notes.models import Note
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.timezone import localtime
from notes.models import Note
from django.core.serializers.json import DjangoJSONEncoder


# def get(request, canvas_order):
#     # First, ensure the user is authenticated
#     if not request.user.is_authenticated:
#         return HttpResponseForbidden("You must be logged in to view this page.")

#     # if canvas is not created, return bad response
#     canvases = Canvas.objects.filter(user=request.user).order_by('created_at')
#     # print(canvases)
#     # Try to get the canvas
#     try:
#         canvas_to_view = canvases[canvas_order-1]
#     except IndexError:
#         return JsonResponse({"error": "No such canvas."}, status=404)

#     notes = canvas_to_view.notes.all()  # Assuming a related_name of 'notes' on the Note model

#     # Serialize the notes data
#     notes_data = [{
#         "notesBody": note.notesBody,
#         "posX": note.posX,
#         "posY": note.posY,
#         "timestamp": note.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
#         "height": note.height,
#         "width": note.width,
#         "pinned": note.pinned,
#         "color": note.color
#     } for note in notes]

#     # Return the notes with the canvas information
#     return JsonResponse({
#         "canvas_id": canvas_to_view.id,
#         "canvas_title": canvas_to_view.title,
#         "notes": notes_data,
#     }, status=200)


    # Fetch the canvas by ID and ensure it belongs to the current user or return 404 if not found
    # canvas = get_object_or_404(Canvas, id=canvas_id, user=request.user)
    #
    # # Retrieve all notes associated with this canvas
    # notes = Note.objects.filter(canvas=canvas)
    #
    #
    # notes_str = "Notes on Canvas '{}':\n\n".format(canvas.name)
    # for note in notes:
    #     notes_str += "Title: {}\nBody: {}\n---\n".format(note.notesBody, note.posX, note.posY, note.height, note.width, note.pinned, note.color)
    #
    # # Return the notes as HttpResponse
    # return HttpResponse(notes_str, content_type="text/plain")

# @csrf_exempt
# def create_canvas(request):
#     # First, ensure the user is authenticated
#     # print(request.user)
#     if not request.user.is_authenticated:
#         return HttpResponseForbidden("You must be logged in to view this page.")

#     try:
#         data = json.loads(request.body)
#         title = data.get('title')
#         canvas_id = data.get('canvas_id')
#     except json.JSONDecodeError:
#         return JsonResponse({'error': 'Invalid JSON'}, status=400)
#     # Create a new canvas for the current user
#     print(request.user, title)
#     canvas = Canvas.objects.create(user=request.user, title=title)
     
#     len = Canvas.objects.filter(user=request.user).count()
#     # print(len)
#     local_created_at = localtime(canvas.created_at)
#     # Return the canvas ID as HttpResponse
#     return JsonResponse({
#         'id': canvas_id,
#         'order': len,
#         'title': canvas.title,
#         'timestamp': local_created_at.strftime('%Y-%m-%d %H:%M:%S')  # Adjust the date format as needed
#     }, status=201)
@csrf_exempt
def create_canvas(request):
    # First, ensure the user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseForbidden("You must be logged in to view this page.")

    try:
        data = json.loads(request.body)
        title = data.get('title')
        # Get the custom canvas ID from the frontend
        canvas_id = data.get('canvas_id')  # Assuming the frontend sends the canvas_id in the request body
        print(canvas_id)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # Check if the custom canvas ID is provided
    if canvas_id:
        # Check if a canvas with the provided ID already exists
        if Canvas.objects.filter(user=request.user, id=canvas_id).exists():
            return JsonResponse({'error': 'Canvas ID already exists'}, status=400)
    else:
        # If no custom canvas ID is provided, let Django generate a UUID
        canvas_id = None

    # Create a new canvas for the current user
    canvas = Canvas.objects.create(user=request.user, title=title, id=canvas_id)
    
    # Calculate the total number of canvases for the user
    canvas_count = Canvas.objects.filter(user=request.user).count()

    # Convert the created_at timestamp to the local timezone
    local_created_at = localtime(canvas.created_at)

    # Return the canvas details as JSON response
    print("by",canvas.id)
    return JsonResponse({
        'id': canvas_id,
        'order': canvas_count,
        'title': canvas.title,
        'timestamp': local_created_at.strftime('%Y-%m-%d %H:%M:%S')
    }, status=201)

@csrf_exempt
def get_notes_on_canvas(request, canvas_id):
    # Ensure the user is authenticated
    print(canvas_id)
    if not request.user.is_authenticated:
        return HttpResponseForbidden("You must be logged in to view this page.")
    
    try:
        canvas = Canvas.objects.get(id=canvas_id, user=request.user)
    except Canvas.DoesNotExist:
        return JsonResponse({"error": "No such canvas."}, status=404)
    notes = canvas.notes.all()  

    # Retrieve all notes associated with the canvas
    #notes = Note.objects.filter(canvas=canvas)
    # Serialize the notes data
    notes_data = [{
    "id": note.id,
    #"canvas": note.canvas,   
    "notesBody": note.notesBody,
    "posX": note.posX,
    "posY": note.posY,
    "timestamp": note.timestamp.strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
    "height": note.height,
    "width": note.width,
    "pinned": note.pinned,
    "color": note.color
    } for note in notes]

    # notes_data = [{'id': note.id, 'content': note.notesBody} for note in notes]
    print(notes_data)

    # Return the notes as JSON response
    return JsonResponse({'notes': notes_data}, status=200, encoder=DjangoJSONEncoder)
# def delete(request, canvas_order):
#     # First, ensure the user is authenticated
#     if not request.user.is_authenticated:
#         return HttpResponseForbidden("You must be logged in to view this page.")
#     # print(request.user, canvas_id)
#     # canvas = get_object_or_404(Canvas, id=canvas_id, user=request.user)
#     # canvas.delete()
#     # return JsonResponse({"message": "Canvas deleted successfully."}, status=200)
#     # Get the list of canvases for the user, ordered by creation time
#     canvases = Canvas.objects.filter(user=request.user).order_by('created_at')

#     # Try to get the canvas
#     try:
#         canvas_to_delete = canvases[canvas_order-1]
#     except IndexError:
#         return JsonResponse({"error": "No such canvas."}, status=404)

#     # Delete the canvas
#     canvas_to_delete.delete()

#     # Return a success message
#     return JsonResponse({"message": "Canvas deleted successfully."}, status=200)

@csrf_exempt
def delete_canvas(request, canvas_id):
    # Ensure the user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseForbidden("You must be logged in to view this page.")
    
    try:
        canvas = Canvas.objects.get(id=canvas_id, user=request.user)
    except Canvas.DoesNotExist:
        return JsonResponse({"error": "No such canvas."}, status=404)

    # Delete the canvas
    canvas.delete()

    # Return a success message
    return JsonResponse({"message": "Canvas deleted successfully."}, status=200)
# def update(request, canvas_id):
#     # First, ensure the user is authenticated
#     if not request.user.is_authenticated:
#         return HttpResponseForbidden("You must be logged in to view this page.")
#
#     # Fetch the canvas by ID and ensure it belongs to the current user or return 404 if not found
#     canvas = get_object_or_404(Canvas, id=canvas_id, user=request.user)
#
#     # Update the canvas title
#     canvas.title = request.POST.get('title', canvas.title)
#     canvas.save()
#
#     # Return a success message
#     return HttpResponse("Canvas updated successfully.")

@csrf_exempt
def update_canvas(request, canvas_id):
    # First, ensure the user is authenticated
    if not request.user.is_authenticated:
        return JsonResponse({"error": "You must be logged in to view this page."}, status=403)

    try:
        data = json.loads(request.body)
        title = data.get('title')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # Check if the canvas with the provided ID exists and belongs to the current user
    canvas = Canvas.objects.filter(id=canvas_id, user=request.user).first()
    if not canvas:
        return JsonResponse({"error": "Canvas not found."}, status=404)

    # Update the title if provided
    if title:
        canvas.title = title
        canvas.save()

    # Return the updated canvas details
    return JsonResponse({
        'id': canvas.id,
        'title': canvas.title,
        'timestamp': canvas.created_at.strftime('%Y-%m-%d %H:%M:%S')
    }, status=200)