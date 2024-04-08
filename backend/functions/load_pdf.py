from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document
import base64
from openai import OpenAI
import requests
import base64
import fitz  
import base64
import io


# client = OpenAI()
api_key = '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'

def pdf_to_images_base64(pdf_file_path):
    doc = fitz.open(pdf_file_path)
    base64_images = []
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        pix = page.get_pixmap()
        img_bytes = pix.tobytes("png")
        img_base64 = base64.b64encode(img_bytes).decode('utf-8')
        base64_images.append(img_base64)
    
    doc.close()
    return base64_images

def describe_image(pdf):
    image = pdf_to_images_base64(pdf)
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
            "text": "Output all text in this image. Only give me the text in the document and this text only"
            },
            {
            "type": "image_url",
            "image_url": {
                "url": f"data:image/jpeg;base64,{image}"
            }
            }
        ]
        }
    ],
    "max_tokens": 300
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    response_data = response.json()
    return response_data



