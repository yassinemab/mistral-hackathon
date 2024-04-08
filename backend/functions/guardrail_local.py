import typer
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
from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document

import re
import base64
import tempfile
import json

prompt = """
Given the following context ${document}.

${gr.complete_json_suffix_v2}

Only response with valid raw JSON.

"""

def structure_date(base64):
    pdf = read_pdf(base64)
    json = pdf_to_json(pdf)
    print(json)
    return HttpResponse('success')

def read_pdf(document):
    #buffer = base64.b64decode(document)
    #with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmpfile:
    #    tmpfile.write(buffer)
    #    temp_pdf_path = tmpfile.name
    loader = PyPDFLoader(document)
    pages = loader.load_and_split() 
    page_text = [document.page_content for document in pages] if hasattr(
        pages[0], 'page_content') else ""
    return ''.join(page_text)

pdf = "/Users/gijsbertwesteneng/Downloads/FIchiers PDF/collecte_fichiers_arretes_bac_idf_fr/02.03.2020-PERMANENT-POIDS-LOURDS.pdf"
document = read_pdf(document=pdf)

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
    road_type: str = Field(
        description="Road type"
    )
    road_name: str = Field(
        description="Road name"
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
    construction_work: int = Field(
        description="Are they working", validators=[("noop")]
    )
    siret: int = Field(
        description="SIRET number"
    )


def complete_request():
    guard = gd.Guard.from_pydantic(output_class=Model, prompt=prompt, num_reasks=3)

    raw_llm_output, validated_output, *res = guard(
        llm_api,
        prompt_params={"document": docs, "tokens": tokens},
        num_reask=3,
        stream=False,
    )
    return validated_output # Need to be validated_output


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
        "model": "mistral-large-latest",
        "temperature": 0.01,
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

def pdf_to_json(docs=docs):
    structured_orders = complete_request(docs)
    print("###### END RESULT ########")
    print(structured_orders)
    return structured_orders