const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json')

notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {         
            console.log(err);
        } else {
            console.log(data)
            res.json(JSON.parse(data));
        }
        
    });
});

notes.post('/', (req, res) => {
    const {title, text} = req.body;
    console.log(title, text);
    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedNote = JSON.parse(data);
                    console.log(parsedNote);
                parsedNote.push(newNote);
                    console.log(`Updated note ${parsedNote}`)
                fs.writeFile('./db/db.json', JSON.stringify(parsedNote),
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
        res.status(500).json('Error in posting note');
    }
});

module.exports = notes;