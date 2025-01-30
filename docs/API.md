# Notesy API Documentation

Version: 1.0.0  
Base URL: `http://localhost:3000` (development)

## Authentication

Notesy uses Auth0 for authentication. All protected endpoints require a valid session cookie obtained through Auth0 login.

### Authentication Flow

1. Users are redirected to Auth0's login page via `/login`
2. After successful authentication, users are redirected back with a session cookie
3. Protected endpoints check for authentication using the `requiresAuth()` middleware

## Endpoints

### Authentication

#### Get Login Page
```
GET /login
```
Redirects to Auth0 login page.

#### Logout
```
GET /logout
```
Clears the session and redirects to home page.

#### Get User Profile
```
GET /profile
```
**Authentication Required**: Yes

**Response**: Renders profile page with user information
```json
{
  "name": "string",
  "email": "string",
  "picture": "string (URL)",
  "updated_at": "string (ISO date)",
  "given_name": "string (optional)"
}
```

### Notes

#### List All Notes
```
GET /notes
```
**Authentication Required**: Yes

**Query Parameters**:
- `tag` (optional): Filter notes by specific tag

**Response**: Renders notes page with array of note objects
```json
{
  "notes": [
    {
      "_id": "string",
      "title": "string",
      "content": "string",
      "author": "string",
      "tags": ["string"],
      "lastUpdated": "string (ISO date)"
    }
  ],
  "allTags": ["string"],
  "selectedTag": "string (optional)"
}
```

#### Create New Note Form
```
GET /notes/new
```
**Authentication Required**: Yes

**Response**: Renders new note creation form

#### Create Note
```
POST /notes
```
**Authentication Required**: Yes

**Content-Type**: application/x-www-form-urlencoded

**Request Body**:
```json
{
  "note": {
    "title": "string (required)",
    "content": "string (required)",
    "tags": "string (optional, comma-separated)"
  }
}
```

**Response**: Redirects to /notes on success

#### Get Single Note
```
GET /notes/:id
```
**Authentication Required**: Yes

**URL Parameters**:
- `id`: Note ID

**Response**: Renders note detail page with note object
```json
{
  "note": {
    "_id": "string",
    "title": "string",
    "content": "string",
    "author": "string",
    "tags": ["string"],
    "lastUpdated": "string (ISO date)"
  }
}
```

#### Get Edit Note Form
```
GET /notes/:id/edit
```
**Authentication Required**: Yes

**URL Parameters**:
- `id`: Note ID

**Response**: Renders note edit form with existing note data

#### Update Note
```
PUT /notes/:id
```
**Authentication Required**: Yes

**URL Parameters**:
- `id`: Note ID

**Content-Type**: application/x-www-form-urlencoded

**Request Body**:
```json
{
  "note": {
    "title": "string (required)",
    "content": "string (required)",
    "tags": "string (optional, comma-separated)"
  }
}
```

**Response**: Redirects to /notes on success

#### Delete Note
```
DELETE /notes/:id
```
**Authentication Required**: Yes

**URL Parameters**:
- `id`: Note ID

**Response**: Redirects to /notes on success

## Error Responses

### 404 Not Found
```json
{
  "message": "Not Found",
  "error": {
    "status": 404
  }
}
```

### 500 Server Error
```json
{
  "message": "Error message",
  "error": {
    "stack": "Error stack trace (development only)"
  }
}
```

## Data Models

### Note Schema
```json
{
  "_id": "ObjectId",
  "title": "String (required)",
  "content": "String (required)",
  "author": "String (required)",
  "tags": ["String"],
  "lastUpdated": "Date (default: Date.now)",
  "createdAt": "Date (default: Date.now)"
}
```

## Rate Limiting

Currently, there are no rate limits implemented in the API.

## Best Practices

1. Always include authentication tokens in protected routes
2. Use appropriate HTTP methods for CRUD operations
3. Handle errors gracefully using try-catch blocks
4. Validate input data before processing
5. Use tag filtering to optimize note retrieval

## Development Notes

1. Set up proper environment variables in `.env` file
2. Use development mode for detailed error messages
3. Test authentication flow thoroughly
4. Monitor MongoDB connections and queries
5. Handle CORS if implementing external API access