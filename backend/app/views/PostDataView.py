from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from django.core.files.base import ContentFile
from ..models import DocumentDetails
from functions.guardrail_local import pdf_to_json
from functions.load.load_pdf import describe_image
from .serializers import DocumentDetailsSerializer

class PostDataDB(viewsets.ViewSet):
    parser_classes = (FileUploadParser,)

    def PostPDF(self, request):
        print(request)

        pdf_file = request.data['pdf_file']

        # Read the PDF file
        pdf = ContentFile(pdf_file.read())

        text = describe_image(pdf)
        print(text)
        output = pdf_to_json(docs=text)
        out = pdf_to_json(output)
        print(out)

        data_dict = json.loads(out)

        # Create a new instance of DocumentDetails and set its attributes
        document = DocumentDetails()
        document.org_name = data_dict.get('org_name', '')
        document.regulation_order = data_dict.get('regulation_order', '')
        document.regulation_order_created = data_dict.get('regulation_order_created', '')
        document.regulation_order_status = data_dict.get('regulation_order_status', '')
        document.regulation_status = data_dict.get('regulation_status', '')
        document.regulation_category = data_dict.get('regulation_category', '')
        document.regulation_issuing_authority = data_dict.get('regulation_issuing_authority', '')
        document.regulation_start_date = data_dict.get('regulation_start_date', '')
        document.regulation_end_date = data_dict.get('regulation_end_date', '')
        document.measure_type = data_dict.get('measure_type', '')
        document.vehicle_id = data_dict.get('vehicle_id', '')
        document.vehicle_restricted_type = data_dict.get('vehicle_restricted_type', '')
        document.vehicle_excempted_type = data_dict.get('vehicle_excempted_type', '')
        document.road_type = data_dict.get('road_type', '')
        document.road_name = data_dict.get('road_name', '')
        document.road_number = data_dict.get('road_number', '')
        #document.city_code = data_dict.get('city_code', '')
        document.city_label = data_dict.get('city_label', '')
        document.from_house_number = data_dict.get('from_house_number', 0)
        document.to_house_number = data_dict.get('to_house_number', 0)
        document.geometry = data_dict.get('geometry', '')
        document.period_recurrence_type = data_dict.get('period_recurrence_type', '')
        document.period_start_date = data_dict.get('period_start_date', '')
        document.period_end_date = data_dict.get('period_end_date', '')
        document.time_slot_start_time = data_dict.get('time_slot_start_time', '')
        document.time_slot_end_time = data_dict.get('time_slot_end_time', '')
        document.day = data_dict.get('day', '')
        document.date = data_dict.get('date', '')
        document.country = data_dict.get('country', '')
        document.city = data_dict.get('city', '')
        document.insee_code = data_dict.get('insee_code', '')
        document.city_department = data_dict.get('city_department', '')
        document.street = data_dict.get('street', '')

        # Save the document to the database
        document.save()

        return Response({
           "success": "true"
        }, status=status.HTTP_201_CREATED)

    def PostData(self, request):
        print(request.json)
        pdf_to_json(docs=text)
        out = pdf_to_json(data)
        print(out)

        data_dict = json.loads(out)

        # Create a new instance of DocumentDetails and set its attributes
        document = DocumentDetails()
        document.org_name = data_dict.get('org_name', '')
        document.regulation_order = data_dict.get('regulation_order', '')
        document.regulation_order_created = data_dict.get('regulation_order_created', '')
        document.regulation_order_status = data_dict.get('regulation_order_status', '')
        document.regulation_status = data_dict.get('regulation_status', '')
        document.regulation_category = data_dict.get('regulation_category', '')
        document.regulation_issuing_authority = data_dict.get('regulation_issuing_authority', '')
        document.regulation_start_date = data_dict.get('regulation_start_date', '')
        document.regulation_end_date = data_dict.get('regulation_end_date', '')
        document.measure_type = data_dict.get('measure_type', '')
        document.vehicle_id = data_dict.get('vehicle_id', '')
        document.vehicle_restricted_type = data_dict.get('vehicle_restricted_type', '')
        document.vehicle_excempted_type = data_dict.get('vehicle_excempted_type', '')
        document.road_type = data_dict.get('road_type', '')
        document.road_name = data_dict.get('road_name', '')
        document.road_number = data_dict.get('road_number', '')
        #document.city_code = data_dict.get('city_code', '')
        document.city_label = data_dict.get('city_label', '')
        document.from_house_number = data_dict.get('from_house_number', 0)
        document.to_house_number = data_dict.get('to_house_number', 0)
        document.geometry = data_dict.get('geometry', '')
        document.period_recurrence_type = data_dict.get('period_recurrence_type', '')
        document.period_start_date = data_dict.get('period_start_date', '')
        document.period_end_date = data_dict.get('period_end_date', '')
        document.time_slot_start_time = data_dict.get('time_slot_start_time', '')
        document.time_slot_end_time = data_dict.get('time_slot_end_time', '')
        document.day = data_dict.get('day', '')
        document.date = data_dict.get('date', '')
        document.country = data_dict.get('country', '')
        document.city = data_dict.get('city', '')
        document.insee_code = data_dict.get('insee_code', '')
        document.city_department = data_dict.get('city_department', '')
        document.street = data_dict.get('street', '')

        # Save the document to the database
        document.save()

        return Response({
           "success": "true"
        }, status=status.HTTP_201_CREATED)

    def getRecords(self, request):
        records = DocumentDetails.objects.all()
        serializer = DocumentDetailsSerializer(records, many=True)
        return Response(serializer.data)

    def getRecordDetail(self, request):
        record = DocumentDetails.objects.filter(id=request.GET['id']).first()

        return Response(record.serialize())