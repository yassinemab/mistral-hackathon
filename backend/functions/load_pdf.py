from langchain_community.document_loaders import PyPDFLoader
from langchain.docstore.document import Document



def read_pdf(base_64):
    pages = PyPDFLoader.load_and_split() 
    page_text = [document.page_content for document in pages] if hasattr(
        pages[0], 'page_content') else ""
    return ''.join(page_text), pages
