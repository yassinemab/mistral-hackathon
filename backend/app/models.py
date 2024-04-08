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
    org_name = models.TextField(default='', null=True, blank=True)
    regulation_order = models.TextField(default='', null=True, blank=True)
    regulation_order_created = models.TextField(default='', null=True, blank=True)
    regulation_order_status = models.TextField(default='', null=True, blank=True)
    regulation_status = models.TextField(default='', null=True, blank=True)
    regulation_category = models.TextField(default='', null=True, blank=True)
    regulation_issuing_authority = models.TextField(default='', null=True, blank=True)
    regulation_start_date = models.TextField(default='', null=True, blank=True)
    regulation_end_date = models.TextField(default='', null=True, blank=True)
    measure_type = models.TextField(default='', null=True, blank=True)
    vehicle_id = models.TextField(default='', null=True, blank=True)
    vehicle_restricted_type = models.TextField(default='', null=True, blank=True)
    vehicle_excempted_type = models.TextField(default='', null=True, blank=True)
    road_type = models.TextField(default='', null=True, blank=True)
    road_name = models.TextField(default='', null=True, blank=True)
    road_number = models.TextField(default='', null=True, blank=True)
    city_code = models.TextField(default='', null=True, blank=True)
    city_label = models.TextField(default='', null=True, blank=True)
    from_house_number = models.IntegerField(default=0, null=True, blank=True)
    to_house_number = models.IntegerField(default=0, null=True, blank=True)
    geometry = models.TextField(default='', null=True, blank=True)
    period_recurrence_type = models.TextField(default='', null=True, blank=True)
    period_start_date = models.TextField(default='', null=True, blank=True)
    period_end_date = models.TextField(default='', null=True, blank=True)
    time_slot_start_time = models.TextField(default='', null=True, blank=True)
    time_slot_end_time = models.TextField(default='', null=True, blank=True)
    day = models.TextField(default='', null=True, blank=True)
    date = models.TextField(default='', null=True, blank=True)
    country = models.TextField(default='', null=True, blank=True)
    city = models.CharField(default='', max_length=100, null=True, blank=True)
    insee_code = models.TextField(default='', null=True, blank=True)
    city_department = models.TextField(default='', null=True, blank=True)
    street = models.TextField(default='', null=True, blank=True)
    #construction_work = models.Choices()

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
            "measure_type": self.measure_type,
            "vehicle_restricted_type": self.vehicle_restricted_type,
            "vehicle_id": self.vehicle_id,
            "vehicle_excempted_type": self.vehicle_excempted_type,
            "road_type": self.road_type,
            "road_name": self.road_name,
            "road_number": self.road_number,
            "city_code": self.city_code,
            "city_label": self.city_label,
            "from_house_number": self.from_house_number,
            "to_house_number": self.to_house_number,
            "geometry": self.geometry,
            "period_recurrence_type": self.period_recurrence_type,
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
            "siret": self.siret,
            "city": self.city
        }
