import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import notes from "../assets/data";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  let noteId = useParams().id;
  // let note = notes.find((note) => note.id === Number(noteId));
  let [note, setNote] = useState([null]);

  useEffect(() => {
    getNotes();
  }, [noteId]);

  let getNotes = async () => {
    if (noteId === "new") return;

    let response = await fetch(`http://localhost:8000/notes/${noteId}`);
    let data = await response.json();
    setNote(data);
  };

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  let createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...note, updated: new Date() }),
    });
  };

  let deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let handleSubmit = () => {
    console.log(noteId)
    if (noteId !== 'new' && !note.body) {
      deleteNote();
    } else if (noteId !== 'new') {
      updateNote();
    } else if (noteId === 'new' && note.body !== null) {
      createNote();
    }
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        <Link to="/">
          {noteId !== "new" ? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Done</button>
          )}
        </Link>
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
