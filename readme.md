# My Node Project — Learning Sandbox

A small Express + PostgreSQL project created as a learning sandbox. Its primary purpose is for you to learn how to build simple APIs, work with a database, validate input, and handle password hashing — not to be production-ready.

## Quick overview

- Express server with routes in `routes/` (users + health).
- PostgreSQL connection in `db.js`.
- User logic in `models/`, `services/`, and `controllers/`.
- Request validation and error handling in `middleware/`.
- Swagger UI available at `/api-docs` (configured in `swagger.js`).
- Utility: `utils/asyncHandler.js`.

## Requirements

- Node.js (recommended latest LTS)
- npm
- PostgreSQL (or use the included Docker setup)

## Quick start (local)

1. Install dependencies:
    ```sh
    npm install
    ```

2. Configure environment:
    - Edit `.env` if needed (DB connection values are provided).

3. Run the server:
    ```sh
    node server.js
    ```
   Default port: `3000`.

4. Open API docs:
    - http://localhost:3000/api-docs

5. Health check:
    - GET `/` (see `routes/healthRoutes.js`)

## Using Docker (DB)

1. Start services:
    ```sh
    docker-compose up --build
    ```
   - DB init script: `db/init.sql`.

## Important endpoints

- POST `/users/createNewUser` — create a user (validation applied)
- POST `/users/login` — verify password
- GET `/users` — list users
- GET `/users/reset` — clear users table

See route definitions in `routes/userRoutes.js`.

## Implementation notes (for learning)

- Passwords are hashed with PBKDF2 in `services/userService.js`.
- Controllers are wrapped with `asyncHandler` to propagate async errors.
- Keep in mind this project is intentionally minimal and lacks production features such as HTTPS enforcement, rate limiting, advanced input sanitization, and robust secrets management.

## Tests

- Quick DB connectivity test:
    ```sh
    node tests/test-db.js
    ```

## Files of interest

- `server.js`, `db.js`, `package.json`, `Dockerfile`, `docker-compose.yml`
- `controllers/`, `services/`, `models/`, `routes/`, `middleware/`, `utils/`

---