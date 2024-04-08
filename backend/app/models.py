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
class DocumentDetails(BaseModel):
    country = models.TextField()
    street = models.TextField()
    # construction_work = models.Choices()

    class Meta:
        db_table = "DocumentDetails"

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.title

    def serialize(self):
        return {
            "country": self.country,
            "street": self.street,
            "construction_work": self.construction_work
        }
