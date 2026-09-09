# Conectar a PostgreSQL y ejecutar el script
psql -U tu_usuario -d tu_base_datos -f setup_db.sql

-- Buscar todos los verbos que contengan 'go'
SELECT * FROM search_verbs('go');

-- Obtener todos los verbos con sus tiempos
SELECT * FROM verb_search_view;

-- Buscar por infinitivo exacto
SELECT * FROM verbs WHERE infinitive = 'go';

-- Buscar verbos irregulares
SELECT * FROM verbs WHERE is_regular = false;

-- Obtener tiempos de un verbo específico
SELECT * FROM verb_tenses WHERE verb_id = 1;

