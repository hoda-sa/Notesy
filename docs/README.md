# Notesy

Notesy is a full-stack web application that allows users to create, manage, and organize their notes. Built with Express.js and MongoDB, it features secure authentication through Auth0 and a clean, responsive user interface.

## Features

- User authentication with Auth0
- Create, read, update, and delete notes
- Tag-based organization system
- Responsive design using Tailwind CSS and Bootstrap
- Automatic timestamp tracking for note creation and updates
- Secure user data isolation (users can only see their own notes)

## Technologies Used

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Express OpenID Connect (Auth0)

- **Frontend:**
  - EJS (Embedded JavaScript templates)
  - Tailwind CSS
  - Bootstrap
  - jQuery

## Prerequisites

Before running this project, make sure you have:

- Node.js (Latest LTS version recommended)
- MongoDB installed and running locally
- An Auth0 account and application set up

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd notesy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
BASE_URL=http://localhost:3000
# Auth0 configuration
AUTH0_SECRET='your-auth0-secret'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_ISSUER_BASE_URL='your-auth0-domain'
```

4. Seed the database (optional):
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

## Project Structure

```
notesy/
├── config/
│   ├── db.js           # Database configuration
├── models/
│   ├── note.js         # Note model schema
│   └── user.js         # User model schema
├── public/
│   ├── css/           # Stylesheets
│   └── js/            # Client-side JavaScript
├── routes/
│   └── index.js       # Main route definitions
├── views/
│   ├── notes/         # Note-related views
│   ├── partials/      # Reusable view components
│   └── *.ejs          # Other view templates
├── server.js          # Application entry point
└── package.json
```

## Available Scripts

- `npm run dev`: Starts the development server with nodemon
- `npm test`: Placeholder for test suite

## Authentication

This application uses Auth0 for authentication. Users can:
- Sign up for a new account
- Log in with existing credentials
- Log out
- View their profile information

## API Routes

### Notes
- `GET /notes` - View all notes (authenticated users only)
- `GET /notes/new` - Display new note form
- `POST /notes` - Create a new note
- `GET /notes/:id` - View a specific note
- `GET /notes/:id/edit` - Display edit form for a note
- `PUT /notes/:id` - Update a specific note
- `DELETE /notes/:id` - Delete a specific note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Copyright © 2025 Hoda Co. All rights reserved.

## Support

For support, please open an issue in the repository or contact the development team.