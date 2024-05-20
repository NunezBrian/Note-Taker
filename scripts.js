document.addEventListener('DOMContentLoaded', function () {
    const noteTitle = document.getElementById('note-title');
    const noteText = document.getElementById('note-text');
    const saveNoteButton = document.getElementById('save-note');
    const clearFormButton = document.getElementById('clear-form');
    const newNoteButton = document.getElementById('new-note');
    const clearAllNotesButton = document.getElementById('clear-all-notes');
    const notesList = document.getElementById('notes-list');
    const noteEditor = document.getElementById('note-editor');

    function fetchNotes() {
        fetch('/api/notes')
            .then(response => response.json())
            .then(data => {
                const html = data.map(note => `
                    <div class="note-entry" data-id="${note.id}">
                        ${note.title}
                        <button class="delete-note" data-id="${note.id}">🗑️</button>
                    </div>
                `).join('');
                notesList.innerHTML = html;
            })
            .catch(error => console.error('Error fetching notes:', error));
    }

    function toggleSaveButton() {
        if (noteTitle.value.trim() || noteText.value.trim()) {
            saveNoteButton.classList.remove('hidden');
        } else {
            saveNoteButton.classList.add('hidden');
        }
    }

    noteTitle.addEventListener('input', toggleSaveButton);
    noteText.addEventListener('input', toggleSaveButton);

    notesList.addEventListener('click', function (e) {
        if (e.target.classList.contains('note-entry')) {
            const id = e.target.dataset.id;
            fetch(`/api/notes/${id}`)
                .then(response => response.json())
                .then(data => {
                    noteTitle.value = data.title;
                    noteText.value = data.text;
                    noteEditor.classList.remove('hidden');
                    saveNoteButton.classList.add('hidden');
                    clearFormButton.classList.remove('hidden');
                    newNoteButton.classList.remove('hidden');
                })
                .catch(error => console.error('Error fetching note:', error));
        } else if (e.target.classList.contains('delete-note')) {
            const id = e.target.dataset.id;
            fetch(`/api/notes/${id}`, {
                method: 'DELETE'
            })
            .then(() => fetchNotes())
            .catch(error => console.error('Error deleting note:', error));
        }
    });

    saveNoteButton.addEventListener('click', function () {
        const newNote = {
            title: noteTitle.value,
            text: noteText.value
        };

        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNote)
        })
        .then(response => response.json())
        .then(data => {
            fetchNotes();
            noteTitle.value = '';
            noteText.value = '';
            noteEditor.classList.add('hidden');
            saveNoteButton.classList.add('hidden');
            clearFormButton.classList.add('hidden');
            newNoteButton.classList.remove('hidden');
        })
        .catch(error => console.error('Error saving note:', error));
    });

    clearFormButton.addEventListener('click', function () {
        noteTitle.value = '';
        noteText.value = '';
        noteEditor.classList.add('hidden');
        saveNoteButton.classList.add('hidden');
        clearFormButton.classList.add('hidden');
        newNoteButton.classList.remove('hidden');
    });

    newNoteButton.addEventListener('click', function () {
        noteTitle.value = '';
        noteText.value = '';
        noteEditor.classList.remove('hidden');
        saveNoteButton.classList.add('hidden');
        clearFormButton.classList.remove('hidden');
        newNoteButton.classList.add('hidden');
    });

    clearAllNotesButton.addEventListener('click', function () {
        fetch('/api/notes', {
            method: 'DELETE'
        })
        .then(() => fetchNotes())
        .catch(error => console.error('Error clearing all notes:', error));
    });

    fetchNotes();
});
