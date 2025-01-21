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

// App Variables
const app = express();
// accessing __dirname global
const __dirname = path.dirname(fileURLToPath(import.meta.url));


dotenv.config();

connectDB();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true
};

const port = process.env.PORT || 3000;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});



app.use('/', router);

app.use(methodOverride('_method'));

// routes:

// see all notes by the authenticated user
app.get('/notes', async (req, res) => {
  const notes = await Note.find({ author: req.oidc.user.name });
  res.render('notes/notes', { notes });
});

// Load new note page
app.get('/notes/new', requiresAuth(), async (req, res) => {
  res.render('notes/new');
});

// creating new notes
app.post('/notes', requiresAuth(), async (req, res) => {
  try {
    if (!req.body.note) {
      throw new Error('No note data received');
    }

    const { title, tags, content } = req.body.note;

    // Log the extracted values for debugging
    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Tags:', tags);


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
    // Send back a more user-friendly error
    res.status(500).render('error', {
      message: 'Error creating note',
      error: err
    });
  }
});


// route to show one note:
app.get('/notes/:id', async (req, res) => {
  const note = await Note.findById(req.params.id)
  res.render('notes/show', { note });
});

// route to show the edit form:
app.get('/notes/:id/edit', async (req, res) => {
  const note = await Note.findById(req.params.id)
  res.render('notes/edit', { note });
});

// route to process the update:
app.put('/notes/:id', requiresAuth(), async (req, res) => {
  try {
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

// route to delete a note:
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.redirect('/notes');
});


// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
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
