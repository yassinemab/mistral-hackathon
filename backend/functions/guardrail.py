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

app = typer.Typer()

prompt = """
Given the following context ${document}.

${gr.complete_json_suffix_v2}

Only response with valid raw JSON.

"""

docs =  "Bitcoin (abbreviation: BTC[a]; sign: ₿) is the first decentralized cryptocurrency. Nodes in the peer-to-peer bitcoin network verify transactions through cryptography and record them in a public distributed ledger, called a blockchain, without central oversight. Consensus between nodes is achieved using a computationally intensive process based on proof of work, called mining, that requires increasing quantities of electricity and guarantees the security of the bitcoin blockchain.[5] " # Should loop through all example answer in CSV format

class Model(BaseModel):
    Street: str = Field(
        description="Street",
    )
    House_number: int = Field(
        description="House number",
    )
    Constructions_work: int = Field(
        Field(description="Are they working", validators=[("noop")])
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
        #"temprature": 0.01,
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