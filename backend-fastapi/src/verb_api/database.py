import os
from dotenv import load_dotenv
from psycopg_pool import ConnectionPool
from psycopg.rows import dict_row

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Pool de conexiones reutilizables
pool = ConnectionPool(
    conninfo=DATABASE_URL,
    min_size=2,          # Conexiones mínimas
    max_size=10,         # Conexiones máximas
    kwargs={"row_factory": dict_row},  # Devuelve resultados como diccionarios
    open=True,
)


def get_db():
    """
    Dependencia de FastAPI: obtiene una conexión del pool
    y la devuelve al terminar el request.
    """
    with pool.connection() as conn:
        yield conn
