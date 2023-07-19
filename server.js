const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 3001;
// const notes = require('../../../db/db.json')

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    const saveNotes = fs.readFileSync('./db/db.json', 'utf-8')
    const notes = JSON.parse(saveNotes);

  res.json(notes);
})

app.post('/api/notes', (req, res) => {
    const saveNotes = fs.readFileSync('./db/db.json', 'utf-8')
    const notes = JSON.parse(saveNotes);

    console.log(req.body);

    notes.push(req.body);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    // res.end();

    res.json({
        message: 'note was written'
    })
})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})