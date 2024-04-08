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

    nested_list = []
    for page_num in range(len(doc)):
        base64_images = []
        page = doc.load_page(page_num)
        pix = page.get_pixmap()
        img_bytes = pix.tobytes("png")
        img_base64 = base64.b64encode(img_bytes).decode('utf-8')
        base64_images.append(img_base64)
        nested_list.append(base64_images)

    doc.close()
    return nested_list


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


folder = '/Users/connor/Downloads/FIchiers PDF/collecte_fichiers_arretes_bac_idf_fr'


output_file_path = 'output_data.txt'
output_folder_path = 'output_text'

for filename in os.listdir(folder):
    if filename.endswith('.pdf'):
        pdf_path = os.path.join(folder, filename)
        try:
            document_data = describe_images(pdf_path)
            output_file_path = os.path.join(output_folder_path, os.path.splitext(filename)[0] + ".txt")
            with open(output_file_path, 'w') as outfile:
                for data in document_data:
                    outfile.write(data + "\n")
            print(f"Processed {filename} successfully.")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")



