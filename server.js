const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { v4: uuidv1 } = require('uuid');
const { urlencoded } = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

//set up body parsing and static files
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(express.static("public"));


// GET Request
app.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', function(err, contents) {
        let notes = JSON.parse(contents);
        res.send(notes);
    });
});

// POST Request
app.post('/api/notes', (req, res) => {
    

    fs.readFile('db/db.json', "utf8", (err, data) => {
        if (err) throw err;
           let arr = JSON.parse(data)
           
        let userNote = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv1()
        }
         arr.push(userNote);
         fs.writeFileSync("db/db.json", JSON.stringify(arr));
         res.json(userNote);
    });  
});


app.delete("/api/notes/:id", (req, res) => {
    console.log(req.params.id)
    fs.readFile('db/db.json', "utf8", (err, data) => {
        if (err) throw err;
        let arr = JSON.parse(data)
        let filteredNotes = arr.filter((note) => note.id !== req.params.id )
        fs.writeFileSync("db/db.json", JSON.stringify(filteredNotes));
        res.json({ok:true})
    }); 
})

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
  
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// LISTEN on PORT 3000
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
});