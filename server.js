const fs = require('fs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
// const notes = require('../../../db/db.json')

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    const saveNotes = fs.readFileSync('./db/db.json', 'utf-8')
    const notes = JSON.parse(saveNotes);

  res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const saveNotes = fs.readFileSync('./db/db.json', 'utf-8')
    const notes = JSON.parse(saveNotes);

    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);

    console.log(req.body);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    // res.end();

    res.json({
        message: 'note was written'
    })
});

app.delete('/api/notes/:id', (req, res) => {
    const saveNotes = fs.readFileSync('./db/db.json', 'utf-8');
    let notes = JSON.parse(saveNotes);
    
    // filter out the note with the provided id
    notes = notes.filter(note => note.id !== req.params.id);
  
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    
    res.json({
      message: 'note was deleted'
    });
  });
  

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
});


// need a step before I push to notes array, I need to add an ID

// check out npm uuid