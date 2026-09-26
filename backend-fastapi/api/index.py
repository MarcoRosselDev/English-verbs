# backend-fastapi/api/index.py
from src.verb_api.main import app

# Vercel busca una variable llamada 'app' para pasarla al servidor ASGI.
# La importación de arriba cumple con ese requisito.

# we[re]