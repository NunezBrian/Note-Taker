# Note Taker Application

## Description

The Note Taker application allows users to create, view, and delete notes. The application uses a JSON file (`db.json`) on the back end to store and retrieve notes. The application features a simple and intuitive UI for easy note management.

## Features

- Create a new note
- View existing notes
- Delete individual notes
- Delete all notes
- Store notes in a JSON file on the back end

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd note-taker
2. **Install Dependencies**

    npm install

3. **Run the Application**

    node server

## Usage

    1. **Navigate to the Application**

Open your web browser and go to http://localhost:3000.

Create a New Note

Click on "Take Notes" to navigate to the notes page.
Click on the "New Note" button.
Enter a note title and note text.
The "Save Note" button will appear. Click it to save the note.
View Existing Notes

Existing notes will be listed in the left-hand column.
Click on a note to view its content in the right-hand column.
Delete a Note

Click on the trash can icon next to a note in the left-hand column to delete it.
Clear All Notes

Click on the "Clear All Notes" button to delete all notes.
API Routes
GET /api/notes

Fetches all saved notes.
Response: JSON array of note objects.
GET /api/notes/:id

Fetches a single note by ID.
Response: JSON object of the note.
POST /api/notes

Creates a new note.
Request Body: JSON object with title and text.
Response: JSON object of the created note.
DELETE /api/notes/:id

Deletes a note by ID.
Response: 204 No Content.
DELETE /api/notes

Deletes all notes.
Response: 204 No Content.
