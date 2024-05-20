const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

const dbPath = path.join(__dirname, 'db', 'db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve scripts.js from the root directory
app.use('/scripts.js', express.static(path.join(__dirname, 'scripts.js')));

// Route to serve the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the notes page
app.get('/note.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'note.html'));
});

// API route to get all notes
app.get('/api/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

// API route to get a single note by ID
app.get('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        const notes = JSON.parse(data);
        const note = notes.find(note => note.id === noteId);
        if (note) {
            res.json(note);
        } else {
            res.status(404).send('Note not found');
        }
    });
});

// API route to add a new note
app.post('/api/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() };

    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), err => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.json(newNote);
        });
    });
});

// API route to delete a note by ID
app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), err => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            res.sendStatus(204);
        });
    });
});

// API route to delete all notes
app.delete('/api/notes', (req, res) => {
    fs.writeFile(dbPath, JSON.stringify([], null, 2), err => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        res.sendStatus(204);
    });
});

// Catch-all route to redirect to the landing page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
