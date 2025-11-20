**Copilot Agent Instructions**

- **Purpose**: Provide immediately-actionable, repository-specific guidance for AI coding agents working on the OctoFit Tracker exercise.
- **Primary references**: `README.md`, `docs/octofit_story.md`, and `.github/instructions/*.md` (see `octofit_tracker_setup_project.instructions.md`, `octofit_tracker_django_backend.instructions.md`, `octofit_tracker_react_frontend.instructions.md`).

- **Project layout**: The app lives under `octofit-tracker/` with two main components:
  - **Backend**: `octofit-tracker/backend/` (Django REST + Djongo/MongoDB)
  - **Frontend**: `octofit-tracker/frontend/` (React, created with CRA)

- **Do not change directories**: All commands must be run without `cd`; instead point at the target path. Examples:
  - Create venv: `python3 -m venv octofit-tracker/backend/venv`
  - Install backend deps: `pip install -r octofit-tracker/backend/requirements.txt`
  - Install frontend deps: `npm install --prefix octofit-tracker/frontend`
  - Run frontend build: `npm run build --prefix octofit-tracker/frontend`

- **Forwarded ports (Codespaces/templates)**: only use these ports when exposing services:
  - `8000` — public (Django dev server)
  - `3000` — public (React dev server)
  - `27017` — private (MongoDB)

- **Backend / Django specifics**:
  - The backend uses Django + Djongo to talk to MongoDB; see `.github/instructions/octofit_tracker_django_backend.instructions.md` for required `settings.py` snippets.
  - `ALLOWED_HOSTS` must include Codespace hostname when present. Example pattern (from instructions):
    - `if os.environ.get('CODESPACE_NAME'):` append `f"{CODESPACE_NAME}-8000.app.github.dev"` to `ALLOWED_HOSTS`.
  - API router and `base_url` should use the `CODESPACE_NAME` environment variable when available (see urls example in `.github/instructions`).
  - Serializers: convert Mongo `ObjectId` fields to strings before returning JSON.
  - Always prefer Django ORM models/serializers for data changes; do not run raw MongoDB scripts to create schema/data.

- **Example backend run/test commands (without cd)**:
  - Activate venv: `source octofit-tracker/backend/venv/bin/activate`
  - Run dev server: `python octofit-tracker/backend/manage.py runserver 0.0.0.0:8000`
  - Smoke-test endpoint: `curl <codespace-url-or-local>:8000/api/` (instructions recommend `curl` for endpoint checks).

- **MongoDB checks**:
  - Verify mongod: `ps aux | grep mongod`
  - Use `mongosh` for interactive client tasks only when needed. Primary data work should go through Django ORM.

- **Frontend specifics**:
  - The frontend is a CRA app under `octofit-tracker/frontend`.
  - When running npm commands from the root, use `--prefix` or pass the full path: `npm install --prefix octofit-tracker/frontend`.
  - Bootstrap and `react-router-dom` are expected to be installed per `.github/instructions/octofit_tracker_react_frontend.instructions.md`.
  - App image asset: `docs/octofitapp-small.png`.

- **Dependencies & requirement files**:
  - Backend requirements should be kept in `octofit-tracker/backend/requirements.txt` (instructions supply a pinned list).
  - Prefer using that `requirements.txt` for reproducible installs in Codespaces/CI.

- **Where to find patterns/examples**:
  - Use `.github/instructions/octofit_tracker_django_backend.instructions.md` for Django settings, `urls.py` patterns, and serializer guidance.
  - Use `.github/instructions/octofit_tracker_react_frontend.instructions.md` for frontend scaffolding commands and asset locations.
  - `docs/octofit_story.md` explains the app goals and expected features (profiles, activity logging, teams, leaderboard).

- **Agent behaviors & constraints**:
  - Always reference and reuse snippets from `.github/instructions/*` before inventing new conventions.
  - Avoid proposing additional forwarded ports beyond the three listed above.
  - Keep changes minimal and focused: preserve existing public APIs and file layout unless asked to refactor.
  - When suggesting commands, always use absolute or repo-root-relative paths (do not assume `cd`).

- **Common utility commands** (copyable):
  - `python3 -m venv octofit-tracker/backend/venv`
  - `source octofit-tracker/backend/venv/bin/activate && pip install -r octofit-tracker/backend/requirements.txt`
  - `npm install --prefix octofit-tracker/frontend`
  - `python octofit-tracker/backend/manage.py runserver 0.0.0.0:8000`

- **If you need clarification**: Ask the repo owner which CI/test commands should be run, and whether a local Mongo instance is expected in Codespaces or a remote test DB should be used.

Please review and tell me if you'd like me to include explicit run/test scripts, CI snippets, or to merge any existing agent-guidance into this file.
