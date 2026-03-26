# DevConnect Lite — Mini Developer Networking API

DevConnect Lite is a backend REST API for helping developers connect, collaborate, and showcase skills.

It is built with **TypeScript, Node.js, Express, and MongoDB**, with a clean layered structure:

`routes -> controllers -> services -> models`

## Features

- JWT-based authentication (register/login)
- Secure password hashing with `bcryptjs`
- Protected routes for authenticated users
- Developer profile create/update and self profile fetch
- Skill-based profile search with pagination
- Connection request workflow (send, accept, reject)
- Incoming pending requests and accepted connections listing

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (request validation)
- JWT Authentication

## Project Structure

```
src/
 ├── config/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── services/
 ├── types/
 ├── utils/
 ├── validators/
 ├── app.ts
 └── server.ts

docs/
 ├── DEVELOPMENT_PLAN.md
 └── API_REFERENCE.md
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment

`.env.example` is provided. Fill values in `.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/devconnect_lite
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=10
```

### 3) Run in development

```bash
npm run dev
```

### 4) Build for production

```bash
npm run build
npm start
```

## API Base

- Health: `GET /health`
- API prefix: `/api`

## Documentation

- Development plan: `docs/DEVELOPMENT_PLAN.md`
- Full API reference (requests/responses/errors): `docs/API_REFERENCE.md`
- Postman collection: `docs/DevConnect_Lite.postman_collection.json`

## Validation and Error Format

All errors are returned in JSON:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "body.email", "message": "Invalid email" }]
}
```

## Notes

- `.env` is intentionally local and ignored by git.
- Keep `JWT_SECRET` strong in non-local environments.
