import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import logger from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/index.js';
import { auth } from 'express-openid-connect';
import connectDB from './config/db.js';
import methodOverride from 'method-override';
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;

import Note from './models/note.js';

const app = express();
// accessing __dirname global in ES Module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config();
connectDB();

// Setting the view engine to EJS:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


// Auth0 Eviroment configuration
const config = {
  authRequired: false,
  auth0Logout: true
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the authenticated `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', router);

// All Note Routes (CRUD):

// Route to see all notes 10/page and filter by tags:
app.get('/notes', requiresAuth(), async (req, res) => {
  try {
    const selectedTag = req.query.tag;
    const page = parseInt(req.query.page) || 1; // Get the current page from query params
    const limit = 10; // Number of notes per page
    const skip = (page - 1) * limit; // Calculate how many documents to skip

    let query = { author: req.oidc.user.name };

    // If a tag is selected, filter by it
    if (selectedTag) {
      query.tags = selectedTag;
    }

    // Get total count of notes for pagination
    const totalNotes = await Note.countDocuments(query);
    const totalPages = Math.ceil(totalNotes / limit);

    // Get paginated notes
    const notes = await Note.find(query)
      .sort({ lastUpdated: -1 }) // Sort by last updated, newest first
      .skip(skip)
      .limit(limit);

    // Get unique tags for the filter dropdown
    const allTags = await Note.distinct('tags', {
      author: req.oidc.user.name
    });

    res.render('notes/notes', {
      notes,
      allTags,
      selectedTag,
      currentPage: page,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (err) {
    console.error('Error fetching notes:', err);
    // Send back a more user-friendly error
    res.status(500).render('error', {
      message: 'Error fetching notes',
      error: err
    });
  }
});

// Route to Load new note page:
app.get('/notes/new', requiresAuth(), async (req, res) => {
  try {
    res.render('notes/new');

  } catch (err) {

    console.error('Error loading new note page:', err);
    res.status(500).render('error', {
      message: 'Unable to load new note page',
      error: err
    });
  }
});

// Route to create new note and save it to db:
app.post('/notes', requiresAuth(), async (req, res) => {
  try {
    if (!req.body.note) {
      throw new Error('No note data received');
    }

    const { title, tags, content } = req.body.note;

    // Log the extracted values from "new note form" for debugging
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Tags:', tags);

    // Convert tags into an array:
    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const note = await Note.create({
      title,
      author: req.oidc.user.name,
      tags: tagArray,
      content,
    });

    res.redirect('/notes');

  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).render('error', {
      message: 'Error creating note',
      error: err
    });
  }
});


// Route to show one note:
app.get('/notes/:id', requiresAuth(), async (req, res) => {

  try {
    const note = await Note.findById(req.params.id)
    res.render('notes/show', { note });

  } catch (err) {

    console.error('Error fetching note:', err);
    res.status(500).render('error', {
      message: 'Unable to retrieve note',
      error: err
    });
  }

});

// Route to show the edit form:
app.get('/notes/:id/edit', requiresAuth(), async (req, res) => {

  try {

    const note = await Note.findById(req.params.id)
    res.render('notes/edit', { note });

  } catch (err) {

    console.error('Error fetching note for edit:', err);
    res.status(500).render('error', {
      message: 'Unable to load edit form',
      error: err
    });
  }
});

// Route to update (edit) and save the note:
app.put('/notes/:id', requiresAuth(), async (req, res) => {

  try {
    // for debugging
    console.log('Edit form data received:', req.body);

    if (!req.body.note) {
      throw new Error('No note data received');
    }

    const { title, tags, content } = req.body.note;
    const tagArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        tags: tagArray,
        content,
        lastUpdated: Date.now()
      },
      { new: true, runValidators: true }
    );

    res.redirect('/notes');

  } catch (err) {
    console.error('Error updating note:', err);
    res.status(500).render('error', {
      message: 'Error updating note',
      error: err
    });
  }
});

// Route to delete a note:
app.delete('/notes/:id', requiresAuth(), async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the note
    const deletedNote = await Note.findByIdAndDelete(id);

    // Check if note was found and deleted
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.redirect('/notes');

  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Auth0 Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});

http.createServer(app)
  .listen(port, () => {
    console.log(`Listening on ${config.baseURL}`);
  });
