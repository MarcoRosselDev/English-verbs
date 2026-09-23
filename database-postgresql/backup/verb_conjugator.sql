--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: search_verbs(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.search_verbs(search_term text) RETURNS TABLE(id integer, infinitive character varying, past_simple character varying, past_participle character varying, present_participle character varying, third_person_singular character varying, spanish_translation character varying, is_regular boolean, relevance_score integer)
    LANGUAGE plpgsql
    AS $$
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
            WHEN v.past_simple ILIKE '%' || search_term || '%' THEN 4
            WHEN v.past_participle ILIKE '%' || search_term || '%' THEN 4
            WHEN v.present_participle ILIKE '%' || search_term || '%' THEN 4
            WHEN v.third_person_singular ILIKE '%' || search_term || '%' THEN 4
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
$$;


ALTER FUNCTION public.search_verbs(search_term text) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: verbs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verbs (
    id integer NOT NULL,
    infinitive character varying(100) NOT NULL,
    past_simple character varying(100),
    past_participle character varying(100),
    present_participle character varying(100),
    third_person_singular character varying(100),
    is_regular boolean DEFAULT true,
    spanish_translation character varying(200),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.verbs OWNER TO postgres;

--
-- Name: verbs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.verbs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.verbs_id_seq OWNER TO postgres;

--
-- Name: verbs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.verbs_id_seq OWNED BY public.verbs.id;


--
-- Name: verbs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verbs ALTER COLUMN id SET DEFAULT nextval('public.verbs_id_seq'::regclass);


--
-- Data for Name: verbs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verbs (id, infinitive, past_simple, past_participle, present_participle, third_person_singular, is_regular, spanish_translation, created_at, updated_at) FROM stdin;
1	be	was/were	been	being	is	f	ser/estar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
2	have	had	had	having	has	f	tener	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
3	do	did	done	doing	does	f	hacer	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
4	say	said	said	saying	says	f	decir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
5	go	went	gone	going	goes	f	ir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
6	get	got	got/gotten	getting	gets	f	obtener	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
7	make	made	made	making	makes	f	hacer/fabricar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
8	know	knew	known	knowing	knows	f	saber/conocer	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
9	think	thought	thought	thinking	thinks	f	pensar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
10	see	saw	seen	seeing	sees	f	ver	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
11	come	came	come	coming	comes	f	venir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
12	take	took	taken	taking	takes	f	tomar/llevar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
13	give	gave	given	giving	gives	f	dar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
14	find	found	found	finding	finds	f	encontrar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
15	tell	told	told	telling	tells	f	decir/contar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
16	become	became	become	becoming	becomes	f	convertirse en	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
17	leave	left	left	leaving	leaves	f	dejar/salir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
18	feel	felt	felt	feeling	feels	f	sentir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
19	put	put	put	putting	puts	f	poner/colocar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
20	mean	meant	meant	meaning	means	f	significar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
21	keep	kept	kept	keeping	keeps	f	mantener/guardar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
22	let	let	let	letting	lets	f	permitir/dejar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
23	begin	began	begun	beginning	begins	f	comenzar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
24	seem	seemed	seemed	seeming	seems	t	parecer	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
25	help	helped	helped	helping	helps	t	ayudar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
26	talk	talked	talked	talking	talks	t	hablar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
27	turn	turned	turned	turning	turns	t	girar/volverse	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
28	start	started	started	starting	starts	t	comenzar/iniciar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
29	show	showed	shown	showing	shows	t	mostrar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
30	hear	heard	heard	hearing	hears	t	oír/escuchar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
31	play	played	played	playing	plays	t	jugar/tocar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
32	run	ran	run	running	runs	f	correr	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
33	move	moved	moved	moving	moves	t	mover/mudarse	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
34	like	liked	liked	liking	likes	t	gustar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
35	live	lived	lived	living	lives	t	vivir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
36	believe	believed	believed	believing	believes	t	creer	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
37	hold	held	held	holding	holds	f	sostener/tener	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
38	bring	brought	brought	bringing	brings	f	traer/llevar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
39	happen	happened	happened	happening	happens	t	suceder/ocurrir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
40	write	wrote	written	writing	writes	f	escribir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
41	provide	provided	provided	providing	provides	t	proveer/proporcionar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
42	sit	sat	sat	sitting	sits	f	sentarse	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
43	stand	stood	stood	standing	stands	f	estar de pie	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
44	lose	lost	lost	losing	loses	f	perder	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
45	pay	paid	paid	paying	pays	f	pagar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
46	meet	met	met	meeting	meets	f	conocer/encontrar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
47	include	included	included	including	includes	t	incluir	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
48	continue	continued	continued	continuing	continues	t	continuar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
49	set	set	set	setting	sets	f	establecer/colocar	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
50	learn	learned/learnt	learned/learnt	learning	learns	t	aprender	2026-09-05 10:20:05.372132	2026-09-05 10:20:05.372132
\.


--
-- Name: verbs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.verbs_id_seq', 50, true);


--
-- Name: verbs verbs_infinitive_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verbs
    ADD CONSTRAINT verbs_infinitive_key UNIQUE (infinitive);


--
-- Name: verbs verbs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verbs
    ADD CONSTRAINT verbs_pkey PRIMARY KEY (id);


--
-- Name: idx_verbs_infinitive; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_verbs_infinitive ON public.verbs USING btree (infinitive);


--
-- Name: idx_verbs_past_participle; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_verbs_past_participle ON public.verbs USING btree (past_participle);


--
-- Name: idx_verbs_past_simple; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_verbs_past_simple ON public.verbs USING btree (past_simple);


--
-- PostgreSQL database dump complete
--

