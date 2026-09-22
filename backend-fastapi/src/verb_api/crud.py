from psycopg import Connection
from typing import Optional
from verb_api import schemas


# ---------- READ ----------

def get_verb(db: Connection, verb_id: int) -> Optional[dict]:
    with db.cursor() as cur:
        cur.execute(
            "SELECT * FROM verbs WHERE id = %s",
            (verb_id,),
        )
        return cur.fetchone()


def get_verb_by_infinitive(db: Connection, infinitive: str) -> Optional[dict]:
    with db.cursor() as cur:
        cur.execute(
            "SELECT * FROM verbs WHERE infinitive = %s",
            (infinitive,),
        )
        return cur.fetchone()


def get_verbs(
    db: Connection,
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = None,
) -> list[dict]:
    if search:
        pattern = f"%{search}%"
        sql = """
            SELECT * FROM verbs
            WHERE infinitive ILIKE %s
               OR past_simple ILIKE %s
               OR past_participle ILIKE %s
               OR present_participle ILIKE %s
               OR third_person_singular ILIKE %s
               OR spanish_translation ILIKE %s
            ORDER BY infinitive
            OFFSET %s LIMIT %s
        """
        params = (pattern, pattern, pattern, pattern, pattern, pattern, skip, limit)
    else:
        sql = "SELECT * FROM verbs ORDER BY infinitive OFFSET %s LIMIT %s"
        params = (skip, limit)

    with db.cursor() as cur:
        cur.execute(sql, params)
        return cur.fetchall()


def count_verbs(db: Connection, search: Optional[str] = None) -> int:
    if search:
        pattern = f"%{search}%"
        sql = """
            SELECT COUNT(*) AS total FROM verbs
            WHERE infinitive ILIKE %s
               OR past_simple ILIKE %s
               OR past_participle ILIKE %s
               OR present_participle ILIKE %s
               OR third_person_singular ILIKE %s
               OR spanish_translation ILIKE %s
        """
        params = (pattern,) * 6
    else:
        sql = "SELECT COUNT(*) AS total FROM verbs"
        params = ()

    with db.cursor() as cur:
        cur.execute(sql, params)
        row = cur.fetchone()
        return row["total"] if row else 0


# ---------- CREATE ----------

def create_verb(db: Connection, verb: schemas.VerbCreate) -> dict:
    sql = """
        INSERT INTO verbs (
            infinitive, past_simple, past_participle, present_participle,
            third_person_singular, is_regular, spanish_translation
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    """
    params = (
        verb.infinitive,
        verb.past_simple,
        verb.past_participle,
        verb.present_participle,
        verb.third_person_singular,
        verb.is_regular,
        verb.spanish_translation,
    )
    with db.cursor() as cur:
        cur.execute(sql, params)
        row = cur.fetchone()
        db.commit()
        return row


# ---------- UPDATE ----------

def update_verb(
    db: Connection,
    verb_id: int,
    verb_update: schemas.VerbUpdate,
) -> Optional[dict]:
    # Construcción dinámica del SET solo con los campos enviados
    data = verb_update.model_dump(exclude_unset=True)
    if not data:
        return get_verb(db, verb_id)

    set_clauses = []
    params = []
    for field, value in data.items():
        set_clauses.append(f"{field} = %s")
        params.append(value)

    params.append(verb_id)

    sql = f"""
        UPDATE verbs
        SET {', '.join(set_clauses)}, updated_at = NOW()
        WHERE id = %s
        RETURNING *
    """

    with db.cursor() as cur:
        cur.execute(sql, tuple(params))
        row = cur.fetchone()
        db.commit()
        return row


# ---------- DELETE ----------

def delete_verb(db: Connection, verb_id: int) -> bool:
    with db.cursor() as cur:
        cur.execute("DELETE FROM verbs WHERE id = %s", (verb_id,))
        deleted = cur.rowcount > 0
        db.commit()
        return deleted


# ---------- SEARCH (usa función PostgreSQL) ----------

def search_verbs(db: Connection, search_term: str) -> list[dict]:
    with db.cursor() as cur:
        cur.execute(
            "SELECT * FROM search_verbs(%s)",
            (search_term,),
        )
        return cur.fetchall()