# Notesy API Documentation

## Overview

The Notesy API provides programmatic access to create, read, update, and delete notes. All API endpoints require authentication using JWT (JSON Web Tokens).

## Base URL

```
https://api.notesy.com/v1
```

## Authentication

The API uses JWT for authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Get All Notes

```http
GET /api/notes
```

Returns all notes for the authenticated user.

**Response**
```json
{
    "status": "success",
    "results": 2,
    "data": [
        {
            "id": "60d3b41ef682744d953ccf72",
            "title": "Meeting Notes",
            "content": "Discussion points...",
            "tags": ["work", "meeting"],
            "dateCreated": "2025-01-20T10:00:00Z",
            "lastUpdated": "2025-01-20T10:00:00Z"
        }
    ]
}
```

### Get Single Note

```http
GET /api/notes/:id
```

Returns a specific note by ID.

**Response**
```json
{
    "status": "success",
    "data": {
        "id": "60d3b41ef682744d953ccf72",
        "title": "Meeting Notes",
        "content": "Discussion points...",
        "tags": ["work", "meeting"],
        "dateCreated": "2025-01-20T10:00:00Z",
        "lastUpdated": "2025-01-20T10:00:00Z"
    }
}
```

### Create Note

```http
POST /api/notes
```

Creates a new note.

**Request Body**
```json
{
    "title": "Meeting Notes",
    "content": "Discussion points...",
    "tags": "work, meeting"
}
```

**Response**
```json
{
    "status": "success",
    "data": {
        "id": "60d3b41ef682744d953ccf72",
        "title": "Meeting Notes",
        "content": "Discussion points...",
        "tags": ["work", "meeting"],
        "dateCreated": "2025-01-20T10:00:00Z",
        "lastUpdated": "2025-01-20T10:00:00Z"
    }
}
```

### Update Note

```http
PUT /api/notes/:id
```

Updates an existing note.

**Request Body**
```json
{
    "title": "Updated Meeting Notes",
    "content": "Updated discussion points...",
    "tags": "work, meeting, updated"
}
```

**Response**
```json
{
    "status": "success",
    "data": {
        "id": "60d3b41ef682744d953ccf72",
        "title": "Updated Meeting Notes",
        "content": "Updated discussion points...",
        "tags": ["work", "meeting", "updated"],
        "dateCreated": "2025-01-20T10:00:00Z",
        "lastUpdated": "2025-01-20T10:30:00Z"
    }
}
```

### Delete Note

```http
DELETE /api/notes/:id
```

Deletes a note.

**Response**
```json
{
    "status": "success",
    "data": null
}
```

### Get Notes by Tag

```http
GET /api/notes/tags/:tag
```

Returns all notes with a specific tag.

**Response**
```json
{
    "status": "success",
    "results": 1,
    "data": [
        {
            "id": "60d3b41ef682744d953ccf72",
            "title": "Meeting Notes",
            "content": "Discussion points...",
            "tags": ["work", "meeting"],
            "dateCreated": "2025-01-20T10:00:00Z",
            "lastUpdated": "2025-01-20T10:00:00Z"
        }
    ]
}
```

## Error Responses

The API uses conventional HTTP response codes to indicate the success or failure of requests.

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

Error Response Format:
```json
{
    "status": "fail",
    "error": {
        "statusCode": 400,
        "status": "fail"
    },
    "message": "Title and content are required"
}
```

## Rate Limiting

API calls are limited to 100 requests per hour per user. The rate limit can be checked via response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1611158940
```

## SDK Support

Official SDKs are available for:
- JavaScript/Node.js
- Python
- Ruby