# Notesy

Notesy is a secure and intuitive note-taking web application built with Node.js, Express, and MongoDB. Users can create, organize, and manage their notes with tags, all protected behind secure authentication.

## Demo

Check out the live demo: [HERE](https://www.notesy.hodaaghaei.com/)

## Features

- Secure user authentication via Auth0
- Create, read, update, and delete notes
- Tag-based note organization and filtering
- Responsive design for desktop and mobile
- User profiles with avatar support
- Rich text note content

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **View Engine**: EJS
- **Authentication**: Auth0 (express-openid-connect)
- **Frontend**: Bootstrap, Tailwind CSS
- **Other Tools**: 
  - method-override for RESTful routes
  - morgan for HTTP request logging
  - dotenv for environment variable management

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```
3. Add your Auth0 account information & secret key to .env file
```
CLIENT_ID=
ISSUER_BASE_URL=
SECRET='generate your own secret string'
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`


## 📦 Building for Production

To create a production-ready build:

```bash
npm run build
```

This generates optimized files in the `dist` directory that can be deployed to any static hosting service.

## Project Structure

- `/config` - Database configuration
- `/models` - MongoDB models (Note, User)
- `/public` - Static assets (CSS, images, client-side JS)
- `/routes` - Auth0 routes
- `/views` - EJS templates
  - `/notes` - Note-related views
  - `/partials` - Reusable template parts
- `server.js` - Main application file

## API Routes

### Authentication Routes
- `GET /` - Home page with authentication status
- `GET /login` - Login page (provided by Auth0)
- `GET /logout` - Logout endpoint
- `GET /profile` - User profile page (requires authentication)

### Note Routes
All note routes require authentication via `requiresAuth()` middleware.

#### View Routes
- `GET /notes` - Get all notes (with optional tag filtering)
  - Query Parameters:
    - `tag`: Filter notes by specific tag
- `GET /notes/new` - Display new note creation form
- `GET /notes/:id` - View a specific note
- `GET /notes/:id/edit` - Display edit form for a note

#### Data Manipulation Routes
- `POST /notes` - Create a new note
  - Body Parameters (form data):
    - `note[title]`: Note title
    - `note[content]`: Note content
    - `note[tags]`: Comma-separated tags
- `PUT /notes/:id` - Update an existing note
  - Body Parameters (form data):
    - `note[title]`: Updated title
    - `note[content]`: Updated content
    - `note[tags]`: Updated comma-separated tags
- `DELETE /notes/:id` - Delete a note

### Error Handling Routes
- `404` - Not Found handler
- `500` - Server Error handler with custom error pages

## Features in Detail

### Notes
- Create new notes with titles, content, and tags
- View all notes or filter by tags (pagination with 10 note per page)
- Edit existing notes
- Delete unwanted notes
- Automatic timestamp tracking for updates

### Authentication
- Secure login/signup via Auth0
- Protected routes requiring authentication
- User profile page with avatar and details
- Logout functionality

### UI/UX
- Responsive navigation
- Clean, modern interface
- Tag-based filtering system
- Error handling with user-friendly messages

## License

Copyright © 2025 Hoda Co. All rights reserved.