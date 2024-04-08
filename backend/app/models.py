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
    org_name = models.TextField()
    regulation_order = models.TextField()
    regulation_order_created = models.TextField()
    regulation_order_status = models.TextField()
    regulation_status = models.TextField()
    regulation_category = models.TextField()
    regulation_issuing_authority = models.TextField()
    regulation_start_date = models.DateField()
    regulation_end_date = models.DateField()
    road_type = models.TextField()
    road_name = models.TextField()
    from_house_number = models.IntegerField()
    to_house_number = models.IntegerField()
    geometry = models.TextField()
    period_start_date = models.TextField()
    period_end_date = models.DateField()
    time_slot_start_time = models.TimeField()
    time_slot_end_time = models.TimeField()
    day = models.TextField()
    date = models.DateField()
    country = models.TextField()
    city = models.TextField()
    insee_code = models.TextField()
    city_department = models.TextField()
    street = models.TextField()
<<<<<<< HEAD
    # construction_work = models.Choices()
=======
    construction_work = models.Choices()
    siret = models.IntegerField()
>>>>>>> 721bdd9 (new changes)

    class Meta:
        db_table = "DocumentDetails"

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.title

    def serialize(self):
        return {
            "org_name": self.org_name,
            "regulation_order": self.regulation_order,
            "regulation_order_created": self.regulation_order_created,
            "regulation_order_status": self.regulation_order_status,
            "regulation_status": self.regulation_status,
            "regulation_category": self.regulation_category,
            "regulation_issuing_authority": self.regulation_issuing_authority,
            "regulation_start_date":self.regulation_start_date,
            "regulation_end_date": self.regulation_end_date,
            "road_type": self.road_type,
            "road_name": self.road_name,
            "from_house_number": self.from_house_number,
            "to_house_number": self.to_house_number,
            "geometry": self.geometry,
            "period_start_date": self.period_start_date,
            "period_end_date": self.period_end_date,
            "time_slot_start_time": self.time_slot_start_time,
            "time_slot_end_time": self.time_slot_end_time,
            "day": self.day,
            "date": self.date,
            "country": self.country,
            "street": self.street,
            "construction_work": self.construction_work,
            "country": self.country,
            "street": self.street,
            "construction_work": self.construction_work,
            "siret": self.siret
        }
