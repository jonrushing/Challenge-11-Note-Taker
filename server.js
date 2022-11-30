//importing dependencies
const express = require('express');
const path = require('path');

//requiring the route to index.js
const api = require('./routes/index.js');


const app = express();
const PORT = process.env.PORT || 3001;

//using middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//method to use all staic routes in the public folder
app.use(express.static('public'));

//routing '/api' to the index.js
app.use('/api', api);

//html routes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);
//wildcard html route
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//where middlewhere will listen
app.listen(PORT, () =>
console.log(`example app listing at http://localhost:${PORT}`));