import typer
from django.http import HttpResponse
import json
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
from pydantic import BaseModel, Field
from datetime import date, time
from openai import OpenAI
import requests
import base64
import fitz  
import base64
from PIL import Image
import os
import json

api_key = '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'
def describe_images(pdf_file_path):
    doc = fitz.open(pdf_file_path)
    all_data = []

    for page_num in range(len(doc)):    
        page = doc.load_page(page_num)  
        pix = page.get_pixmap()
        img_bytes = pix.tobytes("png")
   
        img_base64 = base64.b64encode(img_bytes).decode('utf-8')

        headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
        }

        payload = {
        "model": "gpt-4-vision-preview",
        "messages": [
            {
            "role": "user",
            "content": [
                {
                "type": "text",
                "text": "Output all text in this image. Only give me the text in the document and this text only NOTHING MORE."
                },
                {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{img_base64}"
                }
                }
            ]
            }
        ]
        }

        response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
        response_data = response.json()
        all_data.append(response_data['choices'][0]['message']['content'])

    return all_data





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
    return structured_orders


pdf_path = ''
document_data = describe_images(pdf_path)