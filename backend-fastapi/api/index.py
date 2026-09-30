# api/index.py
import sys
import os

# Añade la carpeta 'src' al path de Python
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

from verb_api.main import app