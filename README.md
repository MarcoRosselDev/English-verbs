# 🔤 Verb Conjugator

> Smart English verb finder with all conjugations, Spanish translation, and full CRUD management.

[![Backend](https://img.shields.io/badge/backend-Vercel-black?logo=vercel)](https://english-verbs-rho.vercel.app)
[![Frontend](https://img.shields.io/badge/frontend-Netlify-00C7B7?logo=netlify)](https://illustrious-meringue-852c92.netlify.app)
[![Database](https://img.shields.io/badge/database-Neon-00E599?logo=postgresql)](https://neon.com)
[![Python](https://img.shields.io/badge/python-3.12-3776AB?logo=python)](https://www.python.org/)
[![React](https://img.shields.io/badge/react-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

**🌐 Live Demo:** [https://englishverb-conjugation.netlify.app/](https://englishverb-conjugation.netlify.app/)  
**📚 API Docs:** [english-verbs-rho.vercel.app/docs](https://english-verbs-rho.vercel.app/docs)

---

![Verb Conjugator - Main view](./docs/screenshots/hero.png)

---

## 📖 About the project

This project was born from a **personal need**: when I study English, I constantly have to look up verbs on Google to check their conjugations across different tenses. Jumping between tabs, seeing scattered results, and wasting time became frustrating.

**Verb Conjugator** centralizes that information in a fast, clean interface: you search for a verb by its English form or by its Spanish translation, and you instantly get the past simple, past participle, gerund, and third-person singular.

Beyond solving a real need, this project was designed as a **portfolio piece** to demonstrate mastery of:

- **Fullstack** development with Python and TypeScript
- **PostgreSQL** with raw SQL (no ORM) and stored functions
- **Serverless** deployment on Vercel + Netlify + Neon
- **Best practices**: typing, feature-based separation, custom hooks, CSS variables

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** — modern web framework with automatic validation
- **psycopg 3** — PostgreSQL driver with connection pooling (no ORM)
- **Pydantic** — data validation and serialization
- **uv** — ultra-fast dependency manager
- **Vercel** — serverless deployment

### Frontend
- **React 19** — UI library
- **TypeScript** — static typing
- **Vite** — bundler and dev server
- **CSS Modules + CSS Variables** — scoped styling and theming
- **Netlify** — deployment and global CDN

### Database
- **PostgreSQL** (Neon) — serverless relational database
- **`search_verbs` function** — relevance-weighted search
- **Indexes** on search columns for performance

---

## ✨ Features

### Search
- 🔍 Search by **English form** (infinitive, past, participle, etc.)
- 🇪🇸 Search by **Spanish translation**
- ⚡ **300ms debounce** to avoid unnecessary requests
- 🎯 **Relevance scoring** — exact matches first

### Verb management (CRUD)
- ➕ Create new verbs with a validated form
- ✏️ Edit existing verbs with pre-filled data
- 🗑️ Delete with confirmation
- 🏷️ Visual distinction between **regular** and **irregular** verbs

### User Experience
- 🌓 **Light / dark / system theme** with `localStorage` persistence
- 📱 **Responsive design** (mobile, tablet, desktop)
- ⚠️ **Explicit states**: loading, error, empty, success
- ♿ **Basic accessibility**: ARIA roles, focus states, keyboard nav

---

## 📸 Screenshots

### Verb search
![Search results](./docs/screenshots/resultado-de-busqueda.png)

### Create / edit verb
![Create modal](./docs/screenshots/editar.png)

### Dark theme
![Dark theme](./docs/screenshots/tema-oscuro.png)

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     User / Browser                         │
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
│  │  apiClient (typed fetch + error handling)           │   │
│  └─────────────────────────────────────────────────────┘   │
└──────────────────────────┬─────────────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌────────────────────────────────────────────────────────────┐
│  Backend (FastAPI + psycopg)                               │
│  Vercel · https://english-verbs-rho.vercel.app             │
│                                                            │
│  ┌────────────┐  ┌───────────┐  ┌──────────────────────┐   │
│  │  /verbs    │  │  /search  │  │  Connection pool     │   │
│  │  CRUD      │  │  Query    │  │  psycopg 3           │   │
│  └────────────┘  └───────────┘  └──────────┬───────────┘   │
└────────────────────────────────────────────┬───────────────┘
                                             │
                                             ▼
┌────────────────────────────────────────────────────────────┐
│  PostgreSQL (Neon)                                         │
│                                                            │
│  ┌─────────────────┐  ┌────────────────────────────────┐   │
│  │  table: verbs   │  │  function: search_verbs(term)  │   │
│  └─────────────────┘  └────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## 🚀 How to run locally

### Prerequisites

- **Node.js** 20+ and **npm**
- **Python** 3.12+ and **uv** ([installation](https://docs.astral.sh/uv/))
- **PostgreSQL** 15+ running locally

### 1. Clone the repository

```bash
git clone https://github.com/tu-usuario/verb-conjugator.git
cd verb-conjugator
```

### 2. Set up the database

Create a database and run the initialization script:

```bash
createdb -U postgres verb_conjugator
psql -U postgres -d verb_conjugator -f backend-fastapi/setup_database.sql
```

### 3. Backend (FastAPI)

```bash
cd backend-fastapi

# Install dependencies
uv sync

# Create .env file
echo "DATABASE_URL=postgresql://postgres:your_password@localhost:5432/verb_conjugator" > .env

# Run server
uv run uvicorn src.verb_api.main:app --reload --host 0.0.0.0 --port 8000
```

Backend available at `http://localhost:8000`  
Interactive docs at `http://localhost:8000/docs`

### 4. Frontend (React + Vite)

In another terminal:

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env

# Run dev server
npm run dev
```

Frontend available at `http://localhost:5173`

---

## ☁️ How to deploy

### Database — Neon

1. Create an account at [neon.com](https://neon.com)
2. Create a new PostgreSQL project
3. Import the schema with `psql`:
   ```bash
   psql "<YOUR_NEON_CONNECTION_STRING>" -f backup.sql
   ```
4. **Important**: verify that the `id` sequence is properly attached:
   ```sql
   SELECT setval('verbs_id_seq', COALESCE((SELECT MAX(id) FROM verbs), 0) + 1, false);
   ALTER TABLE verbs ALTER COLUMN id SET DEFAULT nextval('verbs_id_seq');
   ALTER SEQUENCE verbs_id_seq OWNED BY verbs.id;
   ```

### Backend — Vercel

1. Connect your GitHub repository to [vercel.com](https://vercel.com)
2. Configure the project:
   - **Root Directory**: `backend-fastapi`
   - **Framework Preset**: Other
3. Add the environment variable:
   - `DATABASE_URL`: your Neon connection string
4. Create `api/index.py`:
   ```python
   import sys, os
   sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))
   from verb_api.main import app
   ```
5. Create `vercel.json`:
   ```json
   {
     "builds": [{ "src": "api/index.py", "use": "@vercel/python" }],
     "routes": [{ "src": "/(.*)", "dest": "api/index.py" }]
   }
   ```
6. Deploy 🚀

### Frontend — Netlify

1. Connect your repository to [netlify.com](https://netlify.com)
2. Configure the project:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Create `frontend/netlify.toml`:
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
- **Production:** `https://english-verbs-rho.vercel.app`

### Endpoints

#### Verbs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/verbs/` | List of verbs (paginated, optional search) |
| `GET` | `/api/verbs/count` | Total count of verbs |
| `GET` | `/api/verbs/{id}` | Get a verb by ID |
| `POST` | `/api/verbs/` | Create a new verb |
| `PUT` | `/api/verbs/{id}` | Update a verb |
| `DELETE` | `/api/verbs/{id}` | Delete a verb |

#### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/search/?q={term}` | Relevance-weighted search |
| `GET` | `/api/search/suggestions?q={term}` | Autocomplete suggestions |

### Examples

**Search for a verb:**
```bash
curl "https://english-verbs-rho.vercel.app/api/search/?q=run"
```

**Create a verb:**
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

### ✅ Completed
- [x] PostgreSQL database with relevance-weighted search function
- [x] FastAPI backend with psycopg 3 (no ORM)
- [x] Full verb CRUD
- [x] Search by English and Spanish
- [x] React + TypeScript + Vite frontend
- [x] Debounced search
- [x] Create/edit modal with validation
- [x] Light/dark/system theme with persistence
- [x] Deployment on Vercel + Netlify + Neon

### 🚧 In progress
- [ ] Search autocomplete
- [ ] Regular/irregular filter
- [ ] Pagination or infinite scroll

### 🔮 Future improvements
- [ ] Unit tests (Vitest + pytest)
- [ ] Custom confirmation modal + toasts
- [ ] Migration to Tailwind CSS
- [ ] Alternative backend in Express / Next.js
- [ ] Authentication with roles (admin / viewer)
- [ ] Docker Compose for local development
- [ ] CI/CD with GitHub Actions
- [ ] Full-text search with `tsvector`

---

## 👤 Author

**Marco Rossel**

- Portfolio: [@coming-soon](https://github.com/MarcoRosselDev)
- LinkedIn: [@marco rossel](https://www.linkedin.com/in/marco-rossel-378b85256/)
- GitHub: [@MarcoRosselDev](https://github.com/MarcoRosselDev)
- Email: andresmarcorossel@gmail.com

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

<p align="center">
  Made with ☕ and a lot of willingness to learn
</p>