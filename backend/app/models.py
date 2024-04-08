from django.db import models
from django.utils import timezone


class BaseModel(models.Model):
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created_at = timezone.now()
        self.updated_at = timezone.now()
        return super(BaseModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True

class Post(BaseModel):
    title = models.TextField()
    description = models.TextField()

    class Meta:
        db_table = "Post"

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.title

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,

            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
