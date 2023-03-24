import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    const MIN_NOTE_LENGTH = 3;

    if (note.content.trim().length < MIN_NOTE_LENGTH) {
      setError(`Note should be at least ${MIN_NOTE_LENGTH} characters long`);
      event.preventDefault();
      return;
    }

    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    setError("");
    event.preventDefault();
  }

  function expand() {
    setExpanded(!isExpanded);
  }

  return (
      <div>
        <form className="create-note">
          {isExpanded ? (
              <input
                  name="title"
                  onChange={handleChange}
                  value={note.title}
                  placeholder="Title"
              />
          ) : null}
          <textarea
              name="content"
              onClick={expand}
              onChange={handleChange}
              value={note.content}
              placeholder="Take a note..."
              rows="3"
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Zoom in={true}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </div>
  );
}


export default CreateArea;
