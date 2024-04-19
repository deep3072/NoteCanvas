from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseForbidden, JsonResponse
from .models import Canvas
from notes.models import Note
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.timezone import localtime
from notes.models import Note


def get(request, canvas_order):
    # First, ensure the user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseForbidden("You must be logged in to view this page.")

    # if canvas is not created, return bad response
    canvases = Canvas.objects.filter(user=request.user).order_by('created_at')
    # print(canvases)
    # Try to get the canvas
    try:
        canvas_to_view = canvases[canvas_order-1]
    except IndexError:
        return JsonResponse({"error": "No such canvas."}, status=404)

    notes = canvas_to_view.notes.all()  # Assuming a related_name of 'notes' on the Note model

    # Serialize the notes data
    notes_data = [{
        "notesBody": note.notesBody,
        "posX": note.posX,
        "posY": note.posY,
        "timestamp": note.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
        "height": note.height,
        "width": note.width,
        "pinned": note.pinned,
        "color": note.color
    } for note in notes]

    # Return the notes with the canvas information
    return JsonResponse({
        "canvas_id": canvas_to_view.id,
        "canvas_title": canvas_to_view.title,
        "notes": notes_data,
    }, status=200)


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

@csrf_exempt
def create_canvas(request):
    # First, ensure the user is authenticated
    # print(request.user)
    if not request.user.is_authenticated:
        return HttpResponseForbidden("You must be logged in to view this page.")

    try:
        data = json.loads(request.body)
        title = data.get('title')
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    # Create a new canvas for the current user
    print(request.user, title)
    canvas = Canvas.objects.create(user=request.user, title=title)
    len = Canvas.objects.filter(user=request.user).count()
    print(len)
    local_created_at = localtime(canvas.created_at)
    # Return the canvas ID as HttpResponse
    return JsonResponse({
        'order': len,
        'title': canvas.title,
        'timestamp': local_created_at.strftime('%Y-%m-%d %H:%M:%S')  # Adjust the date format as needed
    }, status=201)

def delete(request, canvas_order):
    # First, ensure the user is authenticated
    if not request.user.is_authenticated:
        return HttpResponseForbidden("You must be logged in to view this page.")
    # print(request.user, canvas_id)
    # canvas = get_object_or_404(Canvas, id=canvas_id, user=request.user)
    # canvas.delete()
    # return JsonResponse({"message": "Canvas deleted successfully."}, status=200)
    # Get the list of canvases for the user, ordered by creation time
    canvases = Canvas.objects.filter(user=request.user).order_by('created_at')

    # Try to get the canvas
    try:
        canvas_to_delete = canvases[canvas_order-1]
    except IndexError:
        return JsonResponse({"error": "No such canvas."}, status=404)

    # Delete the canvas
    canvas_to_delete.delete()

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