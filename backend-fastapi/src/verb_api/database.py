# src/verb_api/database.py
import os
from dotenv import load_dotenv
from psycopg_pool import ConnectionPool
from psycopg.rows import dict_row

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# NOTA: open=True hace que el pool se abra automáticamente al crearse.
pool = ConnectionPool(
    conninfo=DATABASE_URL,
    min_size=1,  # Reducido para serverless
    max_size=5,  # Reducido para serverless
    kwargs={"row_factory": dict_row},
    open=True,   # IMPORTANTE: Abrir al crear
)

def get_db():
    # El pool ya está abierto, así que solo obtenemos una conexión.
    with pool.connection() as conn:
        yield conn