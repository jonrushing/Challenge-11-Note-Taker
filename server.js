const express = require('express');
const path = require('path');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');


const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extened: true}));

app.use(express.static('public'));

//app.get('/', (req, res) => res.send('navigates to /notes'));

// app.get('/notes', (req, res) => 
//     res.sendFile(path.join(__dirname, 'public/notes.html'))
//     );
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {

        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedNote = JSON.parse(data);

                parsedNote.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4),
                (writeErr) =>
                    writeErr ? console.error(writeErr) : console.info('Successfully updated notes!'));
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note')
    }
});


app.listen(PORT, () =>
console.log(`example app listing at http://localhost:${PORT}`))