from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document
import re
import base64
import tempfile


def read_pdf(document):
    buffer = base64.b64decode(document)
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmpfile:
        tmpfile.write(buffer)
        temp_pdf_path = tmpfile.name
    pages = PyPDFLoader.load_and_split() 
    page_text = [document.page_content for document in pages] if hasattr(
        pages[0], 'page_content') else ""
    return ''.join(page_text)
