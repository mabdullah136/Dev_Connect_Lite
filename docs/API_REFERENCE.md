# DevConnect Lite API Reference

Base URL: `http://localhost:5000`

Base API Prefix: `/api`

## Standard Response Envelope

### Success

```json
{
  "success": true,
  "message": "Optional success message",
  "data": {}
}
```

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "body.email", "message": "Invalid email" }]
}
```

### Operational Error (examples: 401, 404, 409)

```json
{
  "success": false,
  "message": "Human-readable error"
}
```

---

## Health

### `GET /health`

Check service availability.

#### Response `200`

```json
{
  "success": true,
  "message": "DevConnect Lite API is running"
}
```

---

## Authentication

### `POST /api/auth/register`

Register a new user.

#### Request Body

```json
{
  "name": "Jane Dev",
  "email": "jane@example.com",
  "password": "strongpassword"
}
```

#### Success Response `201`

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "665f5f9f1a2b3c4d5e6f7a80",
      "name": "Jane Dev",
      "email": "jane@example.com"
    }
  }
}
```

#### Errors

- `400` validation failed
- `409` email already registered

---

### `POST /api/auth/login`

Authenticate an existing user.

#### Request Body

```json
{
  "email": "jane@example.com",
  "password": "strongpassword"
}
```

#### Success Response `200`

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt>",
    "user": {
      "id": "665f5f9f1a2b3c4d5e6f7a80",
      "name": "Jane Dev",
      "email": "jane@example.com"
    }
  }
}
```

#### Errors

- `400` validation failed
- `401` invalid email or password

---

## Profiles

### `POST /api/profiles/me` (Protected)

Create or update authenticated user profile.

Headers:

- `Authorization: Bearer <jwt>`

#### Request Body

```json
{
  "bio": "Backend engineer focused on TypeScript and cloud-native APIs.",
  "skills": ["TypeScript", "Node.js", "MongoDB"],
  "experienceYears": 4,
  "githubUsername": "janedev"
}
```

#### Success Response `200`

```json
{
  "success": true,
  "message": "Profile saved successfully",
  "data": {
    "_id": "665f61ea1a2b3c4d5e6f7a92",
    "user": {
      "_id": "665f5f9f1a2b3c4d5e6f7a80",
      "name": "Jane Dev",
      "email": "jane@example.com"
    },
    "bio": "Backend engineer focused on TypeScript and cloud-native APIs.",
    "skills": ["typescript", "node.js", "mongodb"],
    "experienceYears": 4,
    "githubUsername": "janedev",
    "createdAt": "2026-03-26T08:00:00.000Z",
    "updatedAt": "2026-03-26T08:00:00.000Z"
  }
}
```

#### Errors

- `400` validation failed
- `401` unauthorized

---

### `GET /api/profiles/me` (Protected)

Get authenticated user profile.

Headers:

- `Authorization: Bearer <jwt>`

#### Success Response `200`

```json
{
  "success": true,
  "data": {
    "_id": "665f61ea1a2b3c4d5e6f7a92",
    "user": {
      "_id": "665f5f9f1a2b3c4d5e6f7a80",
      "name": "Jane Dev",
      "email": "jane@example.com"
    },
    "bio": "Backend engineer focused on TypeScript and cloud-native APIs.",
    "skills": ["typescript", "node.js", "mongodb"],
    "experienceYears": 4,
    "githubUsername": "janedev"
  }
}
```

#### Errors

- `401` unauthorized
- `404` profile not found

---

### `GET /api/profiles/search`

Search profiles by skills with pagination.

Query params:

- `skills` (optional): comma-separated list, example `typescript,node.js`
- `page` (optional): default `1`
- `limit` (optional): default `10`, max `50`

#### Example Request

`GET /api/profiles/search?skills=typescript,node.js&page=1&limit=5`

#### Success Response `200`

```json
{
  "success": true,
  "data": [
    {
      "_id": "665f61ea1a2b3c4d5e6f7a92",
      "user": {
        "_id": "665f5f9f1a2b3c4d5e6f7a80",
        "name": "Jane Dev",
        "email": "jane@example.com"
      },
      "skills": ["typescript", "node.js", "mongodb"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 1,
    "totalPages": 1
  }
}
```

#### Errors

- `400` invalid query params

---

## Connections

### `POST /api/connections/request/:targetUserId` (Protected)

Send a connection request.

Headers:

- `Authorization: Bearer <jwt>`

#### Success Response `201`

```json
{
  "success": true,
  "message": "Connection request sent",
  "data": {
    "_id": "665f64b61a2b3c4d5e6f7ab0",
    "fromUser": "665f5f9f1a2b3c4d5e6f7a80",
    "toUser": "665f631f1a2b3c4d5e6f7aa3",
    "status": "pending",
    "createdAt": "2026-03-26T08:10:00.000Z",
    "updatedAt": "2026-03-26T08:10:00.000Z"
  }
}
```

#### Errors

- `400` invalid id format / self-request
- `401` unauthorized
- `404` target user not found
- `409` already connected or request already exists

---

### `PATCH /api/connections/accept/:fromUserId` (Protected)

Accept an incoming pending request.

Headers:

- `Authorization: Bearer <jwt>`

#### Success Response `200`

```json
{
  "success": true,
  "message": "Connection request accepted",
  "data": {
    "_id": "665f64b61a2b3c4d5e6f7ab0",
    "status": "accepted"
  }
}
```

#### Errors

- `400` invalid id format
- `401` unauthorized
- `404` pending request not found

---

### `PATCH /api/connections/reject/:fromUserId` (Protected)

Reject an incoming pending request.

Headers:

- `Authorization: Bearer <jwt>`

#### Success Response `200`

```json
{
  "success": true,
  "message": "Connection request rejected",
  "data": {
    "_id": "665f64b61a2b3c4d5e6f7ab0",
    "status": "rejected"
  }
}
```

#### Errors

- `400` invalid id format
- `401` unauthorized
- `404` pending request not found

---

### `GET /api/connections` (Protected)

List accepted connections for current user.

Headers:

- `Authorization: Bearer <jwt>`

#### Success Response `200`

```json
{
  "success": true,
  "data": [
    {
      "connectionId": "665f64b61a2b3c4d5e6f7ab0",
      "connectedAt": "2026-03-26T08:12:00.000Z",
      "user": {
        "_id": "665f631f1a2b3c4d5e6f7aa3",
        "name": "Alex Node",
        "email": "alex@example.com"
      }
    }
  ]
}
```

#### Errors

- `401` unauthorized

---

### `GET /api/connections/incoming` (Protected)

List incoming pending requests.

Headers:

- `Authorization: Bearer <jwt>`

#### Success Response `200`

```json
{
  "success": true,
  "data": [
    {
      "_id": "665f64b61a2b3c4d5e6f7ab0",
      "fromUser": {
        "_id": "665f631f1a2b3c4d5e6f7aa3",
        "name": "Alex Node",
        "email": "alex@example.com"
      },
      "toUser": "665f5f9f1a2b3c4d5e6f7a80",
      "status": "pending"
    }
  ]
}
```

#### Errors

- `401` unauthorized

---

## Global HTTP Error Codes Used

- `400` bad request / validation error
- `401` unauthorized
- `404` resource not found
- `409` conflict
- `500` internal server error
