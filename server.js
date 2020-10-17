const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// GET Request
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function(err, contents) {
        let words = JSON.parse(contents);
        res.send(words);
    });
});


