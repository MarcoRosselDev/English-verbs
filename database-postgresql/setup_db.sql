-- Tabla principal de verbos
CREATE TABLE verbs (
    id SERIAL PRIMARY KEY,
    infinitive VARCHAR(100) NOT NULL UNIQUE,
    past_simple VARCHAR(100),
    past_participle VARCHAR(100),
    present_participle VARCHAR(100),
    third_person_singular VARCHAR(100),
    is_regular BOOLEAN DEFAULT true,
    spanish_translation VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para búsquedas rápidas
CREATE INDEX idx_verbs_infinitive ON verbs(infinitive);
CREATE INDEX idx_verbs_past_simple ON verbs(past_simple);
CREATE INDEX idx_verbs_past_participle ON verbs(past_participle);

-- Tabla de tiempos verbales (para expandir en el futuro)
CREATE TABLE verb_tenses (
    id SERIAL PRIMARY KEY,
    verb_id INTEGER REFERENCES verbs(id) ON DELETE CASCADE,
    tense_name VARCHAR(50) NOT NULL, -- 'present', 'past', 'future', etc.
    conjugation VARCHAR(100) NOT NULL,
    subject_pronoun VARCHAR(20), -- 'I', 'you', 'he/she/it', 'we', 'they'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para búsqueda en tiempos verbales
CREATE INDEX idx_verb_tenses_conjugation ON verb_tenses(conjugation);
CREATE INDEX idx_verb_tenses_verb_id ON verb_tenses(verb_id);

-- Verbos Irregulares Más Comunes
INSERT INTO verbs (infinitive, past_simple, past_participle, present_participle, third_person_singular, is_regular, spanish_translation) VALUES
('be', 'was/were', 'been', 'being', 'is', false, 'ser/estar'),
('have', 'had', 'had', 'having', 'has', false, 'tener'),
('do', 'did', 'done', 'doing', 'does', false, 'hacer'),
('say', 'said', 'said', 'saying', 'says', false, 'decir'),
('go', 'went', 'gone', 'going', 'goes', false, 'ir'),
('get', 'got', 'got/gotten', 'getting', 'gets', false, 'obtener'),
('make', 'made', 'made', 'making', 'makes', false, 'hacer/fabricar'),
('know', 'knew', 'known', 'knowing', 'knows', false, 'saber/conocer'),
('think', 'thought', 'thought', 'thinking', 'thinks', false, 'pensar'),
('see', 'saw', 'seen', 'seeing', 'sees', false, 'ver'),
('come', 'came', 'come', 'coming', 'comes', false, 'venir'),
('take', 'took', 'taken', 'taking', 'takes', false, 'tomar/llevar'),
('give', 'gave', 'given', 'giving', 'gives', false, 'dar'),
('find', 'found', 'found', 'finding', 'finds', false, 'encontrar'),
('tell', 'told', 'told', 'telling', 'tells', false, 'decir/contar'),
('become', 'became', 'become', 'becoming', 'becomes', false, 'convertirse en'),
('leave', 'left', 'left', 'leaving', 'leaves', false, 'dejar/salir'),
('feel', 'felt', 'felt', 'feeling', 'feels', false, 'sentir'),
('put', 'put', 'put', 'putting', 'puts', false, 'poner/colocar'),
('mean', 'meant', 'meant', 'meaning', 'means', false, 'significar'),
('keep', 'kept', 'kept', 'keeping', 'keeps', false, 'mantener/guardar'),
('let', 'let', 'let', 'letting', 'lets', false, 'permitir/dejar'),
('begin', 'began', 'begun', 'beginning', 'begins', false, 'comenzar'),
('seem', 'seemed', 'seemed', 'seeming', 'seems', true, 'parecer'),
('help', 'helped', 'helped', 'helping', 'helps', true, 'ayudar'),
('talk', 'talked', 'talked', 'talking', 'talks', true, 'hablar'),
('turn', 'turned', 'turned', 'turning', 'turns', true, 'girar/volverse'),
('start', 'started', 'started', 'starting', 'starts', true, 'comenzar/iniciar'),
('show', 'showed', 'shown', 'showing', 'shows', true, 'mostrar'),
('hear', 'heard', 'heard', 'hearing', 'hears', true, 'oír/escuchar'),
('play', 'played', 'played', 'playing', 'plays', true, 'jugar/tocar'),
('run', 'ran', 'run', 'running', 'runs', false, 'correr'),
('move', 'moved', 'moved', 'moving', 'moves', true, 'mover/mudarse'),
('like', 'liked', 'liked', 'liking', 'likes', true, 'gustar'),
('live', 'lived', 'lived', 'living', 'lives', true, 'vivir'),
('believe', 'believed', 'believed', 'believing', 'believes', true, 'creer'),
('hold', 'held', 'held', 'holding', 'holds', false, 'sostener/tener'),
('bring', 'brought', 'brought', 'bringing', 'brings', false, 'traer/llevar'),
('happen', 'happened', 'happened', 'happening', 'happens', true, 'suceder/ocurrir'),
('write', 'wrote', 'written', 'writing', 'writes', false, 'escribir'),
('provide', 'provided', 'provided', 'providing', 'provides', true, 'proveer/proporcionar'),
('sit', 'sat', 'sat', 'sitting', 'sits', false, 'sentarse'),
('stand', 'stood', 'stood', 'standing', 'stands', false, 'estar de pie'),
('lose', 'lost', 'lost', 'losing', 'loses', false, 'perder'),
('pay', 'paid', 'paid', 'paying', 'pays', false, 'pagar'),
('meet', 'met', 'met', 'meeting', 'meets', false, 'conocer/encontrar'),
('include', 'included', 'included', 'including', 'includes', true, 'incluir'),
('continue', 'continued', 'continued', 'continuing', 'continues', true, 'continuar'),
('set', 'set', 'set', 'setting', 'sets', false, 'establecer/colocar'),
('learn', 'learned/learnt', 'learned/learnt', 'learning', 'learns', true, 'aprender');

-- Verbos Regulares de Ejemplo
INSERT INTO verbs (infinitive, past_simple, past_participle, present_participle, third_person_singular, is_regular, spanish_translation) VALUES
('work', 'worked', 'worked', 'working', 'works', true, 'trabajar'),
('play', 'played', 'played', 'playing', 'plays', true, 'jugar'),
('study', 'studied', 'studied', 'studying', 'studies', true, 'estudiar'),
('travel', 'traveled', 'traveled', 'traveling', 'travels', true, 'viajar'),
('listen', 'listened', 'listened', 'listening', 'listens', true, 'escuchar');

-- Insertar algunos tiempos verbales para un verbo de ejemplo
INSERT INTO verb_tenses (verb_id, tense_name, conjugation, subject_pronoun) VALUES
(1, 'present', 'am', 'I'),
(1, 'present', 'are', 'you'),
(1, 'present', 'is', 'he/she/it'),
(1, 'present', 'are', 'we'),
(1, 'present', 'are', 'they'),
(1, 'past', 'was', 'I'),
(1, 'past', 'were', 'you'),
(1, 'past', 'was', 'he/she/it'),
(1, 'past', 'were', 'we'),
(1, 'past', 'were', 'they');

-- Vista para búsqueda rápida
CREATE VIEW verb_search_view AS
SELECT 
    v.id,
    v.infinitive,
    v.past_simple,
    v.past_participle,
    v.present_participle,
    v.third_person_singular,
    v.spanish_translation,
    v.is_regular,
    json_agg(
        json_build_object(
            'tense', vt.tense_name,
            'conjugation', vt.conjugation,
            'pronoun', vt.subject_pronoun
        )
    ) FILTER (WHERE vt.id IS NOT NULL) as tenses
FROM verbs v
LEFT JOIN verb_tenses vt ON v.id = vt.verb_id
GROUP BY v.id;

-- Función para buscar verbos por múltiples criterios
CREATE OR REPLACE FUNCTION search_verbs(search_term TEXT)
RETURNS TABLE(
    id INTEGER,
    infinitive VARCHAR,
    past_simple VARCHAR,
    past_participle VARCHAR,
    present_participle VARCHAR,
    third_person_singular VARCHAR,
    spanish_translation VARCHAR,
    is_regular BOOLEAN,
    relevance_score INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.infinitive,
        v.past_simple,
        v.past_participle,
        v.present_participle,
        v.third_person_singular,
        v.spanish_translation,
        v.is_regular,
        CASE
            WHEN v.infinitive = search_term THEN 10
            WHEN v.infinitive ILIKE search_term || '%' THEN 8
            WHEN v.infinitive ILIKE '%' || search_term || '%' THEN 5
            WHEN v.past_simple ILIKE '%' || search_term || '%' THEN 3
            WHEN v.past_participle ILIKE '%' || search_term || '%' THEN 3
            ELSE 1
        END as relevance_score
    FROM verbs v
    WHERE 
        v.infinitive ILIKE '%' || search_term || '%'
        OR v.past_simple ILIKE '%' || search_term || '%'
        OR v.past_participle ILIKE '%' || search_term || '%'
        OR v.present_participle ILIKE '%' || search_term || '%'
        OR v.third_person_singular ILIKE '%' || search_term || '%'
    ORDER BY relevance_score DESC, v.infinitive;
END;
$$ LANGUAGE plpgsql;