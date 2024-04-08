import typer
from django.http import HttpResponse
from guardrails import Guard
import guardrails as gd
from guardrails.validators import ValidLength, TwoWords, ValidRange
from pydantic import BaseModel, Field
from typing import List
import string
from datetime import datetime, timedelta
from pydantic import validator
from rich import print
import os
import requests
from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document

from pydantic import BaseModel, Field
from datetime import date, time
from .load.load_pdf import describe_image

import re
import base64
import tempfile
import json

from app.models import DocumentDetails

prompt = """
${document}.

${gr.complete_json_suffix_v2}

"""

### MAIN CODE ###
class Model(BaseModel):
    org_name: str = Field(
        description="Organization name"
    )
    regulation_order: str = Field(
        description="Regulation order"
    )
    regulation_order_created: str = Field(
        description="Regulation order created date"
    )
    regulation_order_status: str = Field(
        description="Regulation order status"
    )
    regulation_status: str = Field(
        description="Regulation status"
    )
    regulation_category: str = Field(
        description="Regulation category"
    )
    regulation_issuing_authority: str = Field(
        description="Regulation issuing authority"
    )
    regulation_start_date: str = Field(
        description="Regulation start date"
    )
    regulation_end_date: str = Field(
        description="Regulation end date"
    )
    measure_type: str = Field(
        description="Measure type"
    )
    vehicle_id: str = Field(
        description="Vehicle ID"
    )
    vehicle_restricted_type: str = Field(
        description="Vehicle restricted type"
    )
    vehicle_excempted_type: str = Field(
        description="Vehicle excempted type"
    )
    road_type: str = Field(
        description="Road type"
    )
    road_name: str = Field(
        description="Road name"
    )
    road_number: str = Field(
        description="Road number"
    )
    city_code: str = Field(
        description="City code"
    )
    city_label: str = Field(
        description="City label"
    )
    from_house_number: int = Field(
        description="From house number"
    )
    to_house_number: int = Field(
        description="To house number"
    )
    geometry: str = Field(
        description="Geometry"
    )
    period_recurrence_type: str = Field(
        description="Period recurrence type"
    )
    period_start_date: str = Field(
        description="Period start date"
    )
    period_end_date: str = Field(
        description="Period end date"
    )
    time_slot_start_time: str = Field(
        description="Time slot start time"
    )
    time_slot_end_time: str = Field(
        description="Time slot end time"
    )
    day: str = Field(
        description="Day"
    )
    date: str = Field(
        description="Date"
    )
    country: str = Field(
        description="Country"
    )
    city: str = Field(
        description="City"
    )
    insee_code: str = Field(
        description="INSEE code"
    )
    city_department: str = Field(
        description="City department"
    )
    street: str = Field(
        description="Street"
    )
    construction_work: str = Field(
        description="Construction work"
    )


def complete_request(document):
    guard = gd.Guard.from_pydantic(output_class=Model, prompt=prompt, num_reasks=1)
    tokens = 1024
    raw_llm_output, validated_output, *res = guard(
        llm_api,
        prompt_params={"document": document, "tokens": tokens},
        num_reask=3,
        stream=False,
    )
    return raw_llm_output # Need to be validated_output


def llm_api(prompt_params: str, **kwargs) -> str:
    print(prompt_params)
    HOST = 'api.mistral.ai' # Please use your own URL
    #HOST = 'gijsbertgpt.test.virt.i.bitonic.nl:8080'
    URI = f'https://{HOST}/v1/chat/completions' # Please use your own endpoint

    headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer 4Goh7YaESXWYxjqVtg0y2QRGXuKnEBxP"
    }

    # Single message request structure, edit the request where needed
    huggingface_request = {
        "messages": [
                {
                    "role": "user",
                    "content": prompt_params
                }
        ],
        "model": "mistral-small-latest",
        "response_format": {
            "type": "json_object"
        },
        "stream": "false",
        "temperature": 0.1,
        #"max_tokens": 9192,
    }
    response = requests.post(URI, headers=headers, json=huggingface_request, verify=False, stream=False)
    if response.status_code == 200:
        result = response.json()
        assistant_message = result['choices'][0]['message']['content']
        print(assistant_message)
        return assistant_message
    else:
        return "Error: Unable to fetch response"

def pdf_to_json(docs):
    structured_orders = complete_request(docs)
    print("###### END RESULT ########")
    print(structured_orders)
    return structured_orders


if __name__ == "__main__":

    dir_path = '/Users/gijsbertwesteneng/Downloads/output_text'

    # Loop through each file in the directory
    for filename in os.listdir(dir_path):
        if filename.endswith('.txt'):  # if you're using text files
            file_path = os.path.join(dir_path, filename)

            # Convert the text file to JSON
            with open(file_path, 'r') as file:
                data = file.read()
                out = pdf_to_json(data)

            # Load the JSON data
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
            document.city_code = data_dict.get('city_code', '')
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