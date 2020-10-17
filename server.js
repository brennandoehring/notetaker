const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');

const app = express();
const PORT = process.env.PORT || 3000;

// GET Request
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function(err, contents) {
        let notes = JSON.parse(contents);
        res.send(notes);
    });
});

// POST Request
app.post('/api/notes', (req, res) => {
    fs.readFile('db/db.json', (err, data) => {
        if (err) throw err;
        let json = JSON.parse(data);
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv1()
        }
        json.push(userNote);
    });
});

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// LISTEN on PORT 3000
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});
