//importing dependencies

const express = require('express');
const notesRouter = require('./notes.js');

const app = express();

//using router to estiblish '/api' > '/notes' > notes.js
app.use('/notes', notesRouter);

module.exports = app;