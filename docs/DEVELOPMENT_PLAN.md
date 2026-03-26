# DevConnect Lite — Professional Development Plan

## 1) Goals

- Build a secure, modular REST API for developer networking.
- Demonstrate backend best practices: auth, data modeling, validation, and pagination.
- Keep architecture extensible for future features (feeds, messaging, notifications).

## 2) Delivery Phases

### Phase A — Foundation

- Initialize TypeScript + Express + MongoDB project.
- Add configuration (`env`, DB bootstrap), security middleware, error handling.
- Set up route organization and app startup lifecycle.

### Phase B — Authentication

- Implement user registration and login.
- Hash passwords with `bcryptjs`.
- Issue JWTs and protect private routes via middleware.

### Phase C — Developer Profiles + Search

- Add profile upsert and self-view endpoints.
- Support skill-based filtering with MongoDB `$all`.
- Implement pagination metadata for scalable listing.

### Phase D — Connections

- Implement connection request lifecycle: send, accept, reject.
- Add incoming pending requests endpoint.
- Add connected developers list endpoint.

### Phase E — Quality + Documentation

- Add runtime request validation using `zod`.
- Standardize error responses and HTTP status semantics.
- Deliver README and full API reference for onboarding.

## 3) Architecture Decisions

- Layered modules: `routes -> controllers -> services -> models`.
- Shared middleware for cross-cutting concerns (auth, validation, error handling).
- Centralized `ApiError` class for predictable operational errors.

## 4) Data Model Summary

- `User`: `name`, `email`, `password`.
- `Profile`: one-to-one with user, includes `skills`, `bio`, `experienceYears`, `githubUsername`.
- `ConnectionRequest`: directed relation with statuses `pending | accepted | rejected`.

## 5) Security & Validation

- JWT Bearer auth required on protected endpoints.
- Passwords never returned in API payloads.
- Input schemas validated at route boundary.

## 6) Future Extensions

- Mutual uniqueness for accepted connections in both directions.
- Rate limiting and brute-force protection for auth endpoints.
- Refresh-token strategy and role-based authorization.
- Test suite (unit + integration with Mongo memory server).
