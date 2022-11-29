//imported dependencies
const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json')

//get route that will read the data in db.json used later to render to the sidebar and main section of 
//notes.html
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

//post route used to take user input, break down body into title and text. Then add a unique id
//and write data to the db.json file
notes.post('/', (req, res) => {
    const {title, text} = req.body;
    console.log(title, text);
    if (title && text) {

//where the input data gets a unique id
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

//reading the existing data in db.json, parsing the data, then taking the new user input and adding it
//into the existing db.json file
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