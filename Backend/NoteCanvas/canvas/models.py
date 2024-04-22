from django.db import models
from django.conf import settings
import uuid
class Canvas(models.Model):
    id = models.UUIDField(primary_key=True, editable=False) 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='canvases')
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.user.username}) - {self.created_at}"
