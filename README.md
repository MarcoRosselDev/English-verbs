# 🔤 Verb Conjugator

> Buscador inteligente de verbos en inglés con todas sus conjugaciones, traducción al español y gestión CRUD completa.

[![Backend](https://img.shields.io/badge/backend-Vercel-black?logo=vercel)](https://english-verbs-rho.vercel.app)
[![Frontend](https://img.shields.io/badge/frontend-Netlify-00C7B7?logo=netlify)](https://illustrious-meringue-852c92.netlify.app)
[![Database](https://img.shields.io/badge/database-Neon-00E599?logo=postgresql)](https://neon.com)
[![Python](https://img.shields.io/badge/python-3.12-3776AB?logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

**🌐 Demo en vivo:** [illustrious-meringue-852c92.netlify.app](https://illustrious-meringue-852c92.netlify.app)  
**📚 API Docs:** [english-verbs-rho.vercel.app/docs](https://english-verbs-rho.vercel.app/docs)

---

![Verb Conjugator - Vista principal](./docs/screenshots/screenshot-rocks.png)

---

## 📖 Sobre el proyecto

Este proyecto nació de una **necesidad personal**: cuando estudio inglés, constantemente tengo que buscar verbos en Google para verificar sus conjugaciones en diferentes tiempos verbales. Saltar entre pestañas, ver resultados dispersos y perder tiempo se volvió frustrante.

**Verb Conjugator** centraliza esa información en una interfaz rápida y limpia: buscas un verbo por su forma en inglés o por su traducción al español, y obtienes al instante el pasado simple, participio pasado, gerundio y la tercera persona del singular.

Además de resolver una necesidad real, este proyecto fue diseñado como **pieza de portafolio** para demostrar dominio de:

- Desarrollo **fullstack** con Python y TypeScript
- **PostgreSQL** con SQL puro (sin ORM) y funciones almacenadas
- Despliegue **serverless** en Vercel + Netlify + Neon
- **Buenas prácticas** de código: tipado, separación por features, hooks personalizados, CSS variables

---

## 🛠️ Stack tecnológico

### Backend
- **FastAPI** — framework web moderno con validación automática
- **psycopg 3** — driver PostgreSQL con pool de conexiones (sin ORM)
- **Pydantic** — validación y serialización de datos
- **uv** — gestor de dependencias ultrarrápido
- **Vercel** — despliegue serverless

### Frontend
- **React 19** — librería de UI
- **TypeScript** — tipado estático
- **Vite** — bundler y dev server
- **CSS Modules + Variables CSS** — estilos con scope y tematización
- **Netlify** — despliegue y CDN global

### Base de datos
- **PostgreSQL** (Neon) — base de datos relacional serverless
- **Función `search_verbs`** — búsqueda ponderada por relevancia
- **Índices** en columnas de búsqueda para rendimiento

---

## ✨ Características

### Búsqueda
- 🔍 Búsqueda por **forma en inglés** (infinitivo, pasado, participio, etc.)
- 🇪🇸 Búsqueda por **traducción al español**
- ⚡ **Debounce de 300ms** para evitar requests innecesarios
- 🎯 **Scoring de relevancia** — coincidencias exactas primero

### Gestión de verbos (CRUD)
- ➕ Crear nuevos verbos con formulario validado
- ✏️ Editar verbos existentes con datos precargados
- 🗑️ Eliminar con confirmación
- 🏷️ Distinción visual entre verbos **regulares** e **irregulares**

### Experiencia de usuario
- 🌓 **Tema claro / oscuro / sistema** con persistencia en `localStorage`
- 📱 **Diseño responsive** (móvil, tablet, escritorio)
- ⚠️ **Estados explícitos**: loading, error, vacío, éxito
- ♿ **Accesibilidad básica**: roles ARIA, focus states, keyboard nav

---

## 📸 Screenshots

### Búsqueda de verbos
![Resultados de búsqueda](./docs/screenshots/resultado-de-busqueda.png)

### Crear / editar verbo
![Modal de creación](./docs/screenshots/editar.png)

### Tema oscuro
![Tema oscuro](./docs/screenshots/tema-oscuro.png)

---

## 🏗️ Arquitectura

```
┌────────────────────────────────────────────────────────────┐
│                     Usuario / Navegador                    │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│  Frontend (React + TS)                                     │
│  Netlify · https://illustrious-meringue-852c92.netlify.app │
│                                                            │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  SearchBar  │  │ SearchResults│  │   VerbForm       │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  apiClient (fetch tipado + manejo de errores)       │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────┬─────────────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌────────────────────────────────────────────────────────────┐
│  Backend (FastAPI + psycopg)                               │
│  Vercel · https://english-verbs-rho.vercel.app             │
│                                                            │
│  ┌────────────┐  ┌───────────┐  ┌──────────────────────┐   │
│  │  /verbs    │  │  /search  │  │  Pool de conexiones  │   │
│  │  CRUD      │  │  Query    │  │  psycopg 3           │   │
│  └────────────┘  └───────────┘  └──────────┬───────────┘   │
└────────────────────────────────────────────┬───────────────┘
                                             │
                                             ▼
┌────────────────────────────────────────────────────────────┐
│  PostgreSQL (Neon)                                         │
│                                                            │
│  ┌─────────────────┐  ┌────────────────────────────────┐   │
│  │  tabla: verbs   │  │  función: search_verbs(term)   │   │
│  └─────────────────┘  └────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 Cómo correr localmente

### Requisitos previos

- **Node.js** 20+ y **npm**
- **Python** 3.12+ y **uv** ([instalación](https://docs.astral.sh/uv/))
- **PostgreSQL** 15+ corriendo localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/verb-conjugator.git
cd verb-conjugator
```

### 2. Configurar la base de datos

Crea una base de datos y ejecuta el script de inicialización:

```bash
createdb -U postgres verb_conjugator
psql -U postgres -d verb_conjugator -f backend-fastapi/setup_database.sql
```

### 3. Backend (FastAPI)

```bash
cd backend-fastapi

# Instalar dependencias
uv sync

# Crear archivo .env
echo "DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/verb_conjugator" > .env

# Ejecutar servidor
uv run uvicorn src.verb_api.main:app --reload --host 0.0.0.0 --port 8000
```

Backend disponible en `http://localhost:8000`  
Documentación interactiva en `http://localhost:8000/docs`

### 4. Frontend (React + Vite)

En otra terminal:

```bash
cd frontend

# Instalar dependencias
npm install

# Crear archivo .env
echo "VITE_API_URL=http://localhost:8000" > .env

# Ejecutar servidor de desarrollo
npm run dev
```

Frontend disponible en `http://localhost:5173`

---

## ☁️ Cómo desplegar

### Base de datos — Neon

1. Crea una cuenta en [neon.com](https://neon.com)
2. Crea un nuevo proyecto PostgreSQL
3. Importa el esquema con `psql`:
   ```bash
   psql "<TU_CADENA_DE_CONEXION_DE_NEON>" -f backup.sql
   ```
4. **Importante**: verifica que la secuencia de `id` esté correctamente asociada:
   ```sql
   SELECT setval('verbs_id_seq', COALESCE((SELECT MAX(id) FROM verbs), 0) + 1, false);
   ALTER TABLE verbs ALTER COLUMN id SET DEFAULT nextval('verbs_id_seq');
   ALTER SEQUENCE verbs_id_seq OWNED BY verbs.id;
   ```

### Backend — Vercel

1. Conecta tu repositorio de GitHub a [vercel.com](https://vercel.com)
2. Configura el proyecto:
   - **Root Directory**: `backend-fastapi`
   - **Framework Preset**: Other
3. Añade la variable de entorno:
   - `DATABASE_URL`: tu cadena de conexión de Neon
4. Crea `api/index.py`:
   ```python
   import sys, os
   sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
   from verb_api.main import app
   ```
5. Crea `vercel.json`:
   ```json
   {
     "builds": [{ "src": "api/index.py", "use": "@vercel/python" }],
     "routes": [{ "src": "/(.*)", "dest": "api/index.py" }]
   }
   ```
6. Deploy 🚀

### Frontend — Netlify

1. Conecta tu repositorio a [netlify.com](https://netlify.com)
2. Configura el proyecto:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Crea `frontend/netlify.toml`:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [build.environment]
     VITE_API_URL = "https://english-verbs-rho.vercel.app"
   ```
4. Deploy 🚀

---

## 📡 API Reference

### Base URL
- **Local:** `http://localhost:8000`
- **Producción:** `https://english-verbs-rho.vercel.app`

### Endpoints

#### Verbos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/verbs/` | Lista de verbos (paginado, búsqueda opcional) |
| `GET` | `/api/verbs/count` | Cuenta total de verbos |
| `GET` | `/api/verbs/{id}` | Obtener un verbo por ID |
| `POST` | `/api/verbs/` | Crear un nuevo verbo |
| `PUT` | `/api/verbs/{id}` | Actualizar un verbo |
| `DELETE` | `/api/verbs/{id}` | Eliminar un verbo |

#### Búsqueda

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/search/?q={term}` | Búsqueda ponderada por relevancia |
| `GET` | `/api/search/suggestions?q={term}` | Sugerencias para autocompletado |

### Ejemplos

**Buscar un verbo:**
```bash
curl "https://english-verbs-rho.vercel.app/api/search/?q=correr"
```

**Crear un verbo:**
```bash
curl -X POST "https://english-verbs-rho.vercel.app/api/verbs/" \
  -H "Content-Type: application/json" \
  -d '{
    "infinitive": "swim",
    "past_simple": "swam",
    "past_participle": "swum",
    "present_participle": "swimming",
    "third_person_singular": "swims",
    "is_regular": false,
    "spanish_translation": "nadar"
  }'
```

---

## 🗺️ Roadmap

### ✅ Completado
- [x] Base de datos PostgreSQL con función de búsqueda ponderada
- [x] Backend FastAPI con psycopg 3 (sin ORM)
- [x] CRUD completo de verbos
- [x] Búsqueda por inglés y español
- [x] Frontend React + TypeScript + Vite
- [x] Búsqueda con debounce
- [x] Modal de creación/edición con validación
- [x] Tema claro/oscuro/sistema con persistencia
- [x] Despliegue en Vercel + Netlify + Neon

### 🚧 En progreso
- [ ] Autocompletado en el buscador
- [ ] Filtro regular/irregular
- [ ] Paginación o scroll infinito

### 🔮 Futuras mejoras
- [ ] Tests unitarios (Vitest + pytest)
- [ ] Modal de confirmación propio + toasts
- [ ] Migración a Tailwind CSS
- [ ] Backend alternativo en Express / Next.js
- [ ] Autenticación con roles (admin / viewer)
- [ ] Docker Compose para desarrollo local
- [ ] CI/CD con GitHub Actions
- [ ] Búsqueda full-text con `tsvector`

---

## 👤 Autor

**Marco Rossel**

- Portfolio: [@proximamente](https://github.com/MarcoRosselDev)
- LinkedIn: [@marco rossel](https://www.linkedin.com/in/marco-rossel-378b85256/)
- GitHub: [@MarcoRosselDev](https://github.com/MarcoRosselDev)
- Email: andresmarcorossel@gmail.com

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

<p align="center">
  Hecho con ☕ y muchas ganas de aprender
</p>