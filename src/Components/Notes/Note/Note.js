import React from "react";
import classes from "./Note.module.css";

import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";

function Note(props) {
  const note = props.note;

  async function pinHandler(e, note) {
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    await setDoc(doc(db, "Notes", note.id), {
      title: note.title,
      tagline: note.tagline,
      notes: note.notes,
      pinned: ~note.pinned,
      color: note.color,
    });
  }

  return (
    <div
      id={note.id}
      className={classes.noteDiv + " p-2" + " " + props.className}
      style={{
        ...props.style,
        backgroundColor: getComputedStyle(document.body).getPropertyValue(
          note.color
        ),
      }}
      onClick={() => {
        props.handleShow(note);
      }}
    >
      {note.pinned == "0" && (
        <BsPinAngle
          className={classes.pinIcon}
          onClick={(event) => {
            pinHandler(event, note);
          }}
        />
      )}
      {note.pinned == "-1" && (
        <BsPinAngleFill
          className={classes.pinFillIcon}
          onClick={(event) => {
            pinHandler(event, note);
          }}
        />
      )}
      <div className={classes.title + " p-0 m-0"}>{note.title}</div>
      <div className={classes.tagline + " p-0 m-0"}>{note.tagline}</div>
      <div className={classes.note + " p-0 m-0 mt-3"}>{note.notes}</div>
    </div>
  );
}

export default Note;
