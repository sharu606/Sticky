import React, { useState, useRef } from "react";
import classes from "./AddNotes.module.css";

import TextareaAutosize from "react-textarea-autosize";
import Button from "../../UI/Button/Button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNotes() {
  const [edit, setEdit] = useState(false);
  const titleRef = useRef("");
  const tagRef = useRef("");
  const noteRef = useRef("");
  const colors = ["--red", "--orange", "--red", "--red", "--green"];

  function closeHandler() {
    setEdit(false);
  }

  function addHandler() {
    const title = titleRef.current.value;
    const tagline = tagRef.current.value;
    const notes = noteRef.current.value;
    const item = colors[Math.floor(Math.random() * colors.length)];

    if (title || tagline || notes) {
      const data = {
        title: titleRef.current.value,
        tagline: tagRef.current.value,
        notes: noteRef.current.value,
        pinned: 0,
        color: item
      };

      addDoc(collection(db, "Notes"), data);
      setEdit(false);
    } else {
      toast.error("Enter some data to add note!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <div className={classes.addnote + " p-2 mt-3"}>
        {!edit && (
          <div
            onClick={() => {
              setEdit(true);
            }}
          >
            Add a note...
            <hr className={classes.hr + " m-0"} />
          </div>
        )}
        {edit && (
          <div>
            <input
              type="text"
              placeholder="Title"
              className={classes.inputBox + " " + classes.title + " m-1"}
              ref={titleRef}
              maxLength="20"
            ></input>
            <input
              type="text"
              placeholder="Tagline"
              className={classes.inputBox + " m-1"}
              ref={tagRef}
              maxLength="27"
            ></input>
            <TextareaAutosize
              placeholder="Notes..."
              className={classes.inputBox + " " + classes.notes + " m-2 mt-3"}
              minRows="4"
              maxRows="8"
              ref={noteRef}
            />
            <div className={classes.rightAlign}>
              <Button className={" m-2"} onClick={closeHandler}>
                Close
              </Button>
              <Button className={" m-2"} onClick={addHandler}>
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default AddNotes;
