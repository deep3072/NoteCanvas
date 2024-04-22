from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
from .models import Note
from canvas.models import Canvas
import json
from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# @require_http_methods(["POST"])
# def create_note(request, canvas_order):
#     if not request.user.is_authenticated:
#         return JsonResponse({'error': 'Authentication required'}, status=403)
#     print("Order", canvas_order)
#     try:
#         data = json.loads(request.body)
#         canvases = Canvas.objects.filter(user=request.user).order_by('created_at')
#         if canvas_order > len(canvases) or canvas_order < 1:
#             return JsonResponse({'error': 'Invalid canvas order'}, status=404)

#         canvas = canvases[canvas_order - 1]
#         title = canvas.title
#         note = Note.objects.create(
#             canvas=canvas,
#             # notesBody=data.get('notesBody', ''),
#             posX=data.get('posX'),
#             posY=data.get('posY'),
#             height=data.get('height'),
#             width=data.get('width'),
#             pinned=data.get('pinned'),
#             color=data.get('color'),
#         )
#         return JsonResponse({'id': note.id, 'order': canvas_order, 'title': title}, status=201) # todo : return full note
#     except json.JSONDecodeError:
#         return JsonResponse({'error': 'Bad request'}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def create_note(request, canvas_id):
    print(request.body)  # Print the request body
    print(request.POST)  # Print POST data (if any)
    print(request.GET)   # Print GET data (if any)
    try:
        canvas = Canvas.objects.get(id=canvas_id)
        print(canvas.id)
        print(canvas)
        data = json.loads(request.body)
        # Create a new note and associate it with the canvas
        note_uuid = data.get('id')
        note = Note.objects.create(
            canvas=canvas,
            id=note_uuid,
            posX=data.get('posX', 0),  # Example property, replace with your own
            posY=data.get('posY', 0),  # Example property, replace with your own
            height=data.get('height', 100),  # Example property, replace with your own
            width=data.get('width', 200),  # Example property, replace with your own
            pinned=data.get('pinned', False),  # Example property, replace with your own
            color=data.get('color', '#FFD700'),  # Example property, replace with your own
            timestamp= data.get('timestamp', None), # Example property,data.get('timestamp', None) # Example property,
            
            # Add other note properties here
        )
        print(note)
        return JsonResponse({"message": "Note created successfully.", "note_id": note.id}, status=200)
    except Canvas.DoesNotExist:
        return JsonResponse({"error": "Canvas not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

    # try:
    #     data = json.loads(request.body)
    #     try:
    #         canvas = Canvas.objects.get(id=canvas_id)
    #     except ObjectDoesNotExist:
    #         return JsonResponse({"error": f"Canvas with id {canvas_id} does not exist."}, status=404)
    #     note = Note.objects.create(
    #         canvas=canvas,
    #         # notesBody=data['notesBody'], # this will be blank in create so change model accordingly
    #         posX=data['posX'],
    #         posY=data['posY'],
    #         height=data['height'],
    #         width=data['width'],
    #         pinned=data['pinned'],
    #         color=data['color']
    #     )
    #     return JsonResponse({"message": "Note created successfully.", "note_id": note.id}, status=201)
    # except Exception as e:
    #     return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_note(request, note_id):
    print("hi")
    print(request)
    print(request.GET.get('id'))
    try:
        note = Note.objects.get(id=note_id)
        note.delete()
        return JsonResponse({"message": "Note deleted successfully."}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)

@csrf_exempt
@require_http_methods(["PUT"])
def update_note(request, note_id):
    try:
        data = json.loads(request.body)
        note = Note.objects.get(id=note_id)
        note.notesBody = data.get('body', note.notesBody)
        note.posX = data.get('posX', note.posX)
        note.posY = data.get('posY', note.posY)
        note.height = data.get('height', note.height)
        note.width = data.get('width', note.width)
        note.pinned = data.get('pinned', note.pinned)
        note.color = data.get('color', note.color)
        note.save()
        return JsonResponse({"message": "Note updated successfully."}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def pin_note(request, note_id):
    try:
        note = Note.objects.get(id=note_id)
        note.pinned = not note.pinned  # Toggle the pinned status
        note.save()
        return JsonResponse({"message": "Note pinned status toggled successfully."}, status=200)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Note not found."}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)
