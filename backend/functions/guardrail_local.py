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
from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document

from pydantic import BaseModel, Field
from datetime import date, time

import re
import base64
import tempfile
import json

prompt = """
${document}.

${gr.complete_json_suffix_v2}

"""

#def structure_date(base64):
#    pdf = read_pdf(base64)
#    json = pdf_to_json(pdf)
#    print(json)
#    return HttpResponse('success')

#def read_pdf(document):
    #buffer = base64.b64decode(document)
    #with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmpfile:
    #    tmpfile.write(buffer)
    #    temp_pdf_path = tmpfile.name
    #print(document)
#    loader = PyPDFLoader(document)
#    pages = loader.load_and_split()
#    print(pages)
#    page_text = [document.page_content for document in pages] if hasattr(
#        pages[0], 'page_content') else ""
#    return ''.join(page_text)

#pdf = '/Users/gijsbertwesteneng/Downloads/Stappen mail overzetten.pdf'
#document = "RÉPUBLIQUE FRANÇAISE LIBERTÉ - ÉGALITÉ - FRATERNITÉVILLE DE VINCENNES VAL-DE-MARNEARRÊTÉ RÉGLEMENTANT LE STATIONNEMENT AVENUE DE VORGESLe Maire de Vincennes, Conseiller régional d'Île-de-France,Vu el Code général des collectivités territoriales ;Vu le Code de la route ;Vu el Code pénal ;Vu le Code de al voirie routière ;Vu l'arrêté interministériel du 24 novembre 1967 relatif à la signalisation routière ;Vu l'arrêté municipal n°4113 en date du 17 novembre 2006 créant un emplacement de livraison face au n°6, avenue de Vorges destiné au stationnement des véhicules réalisant des opérations de manutention ;Vu la consultation du Commissariat de Police en date du 16 février 2011 ;Considérant qu'il convient de réglementer les opérations de manutention à Vincennes de manière à limiter al gêneque ces opérations peuvent apporter à la circulation générale ;Considérant qu'il y a lieu, compte tenu de la difficulté des conditions de circulation et de stationnement dans la ville, de limiter la durée de ces opérations sur les zones aménagées à cet effet du lundi au samedi de 7 h à 20 h ;ARRÊTÉARTICLE I - Le présent arrêté abroge et remplace l'arrêté municipal n° 4113 en date du 17 novembre 2006.Àcompter du J° juin 201 - du lundi au samedi de 7hà20 h: AVENUEDEVORGESfaceaun°6(surunelongueurde15mètres- troisemplacements)Un stationnement sera réservé à l'arrêt des véhicules effectuant des opérations de manutention.Le stationnement des véhicules n'effectuant pas d'opérations de chargements ou déchargements de marchandise seradéclaré comme gênant, selon les termes de l'article R 417.10 du Code de la route et les véhicules en infraction pourront faire l'objet d'un enlèvement immédiat.En dehors de ces jours et horaires, el stationnement des véhicules autres que ceux effectuant des manutentions sera autorise.ARTICLE I - La Vile de VINCENNES procédera à al pose de al matérialisation de ces dispositions.ARTICLE I I - Les infractions au présent arrêté seront constatées par des procès-verbaux.ARTICLE VI - Le Directeur général des services de al ville, el Directeur général des services techniques de la vile et le Commissaire de Police, sont chargés, chacun en ce qui el concerne de l'application du présent arêté.ARTICLE V- Le présent arrêté sera publié au Recueil des actes administratifs.Vincennes, le23 MAI 201Hôtel de Ville - 94304 VINCENNES Cedex - Standard: 01 43 98 65 00 - www.vincennes.fr Ligne directe :01 43 98 66 2 - Télécopie :01 43 98 67 89"

#read_pdf(document=pdf)

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