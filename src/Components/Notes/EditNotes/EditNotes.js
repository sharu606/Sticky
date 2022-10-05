import React, { useState, useRef } from "react";
import classes from "./EditNotes.module.css";

import Modal from "react-bootstrap/Modal";
import Button from "../../UI/Button/Button";

function EditNotes(props) {
  const data = props.data;
  const titleRef = useRef("");
  const tagRef = useRef("");
  const noteRef = useRef("");

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={classes.modal}>
          <input
            type="text"
            placeholder="Title"
            className={classes.inputBox + " " + classes.title + " m-1"}
            ref={titleRef}
            maxLength="20"
            defaultValue={data.title}
          ></input>
          <input
            type="text"
            placeholder="Tagline"
            className={classes.inputBox + " m-1"}
            ref={tagRef}
            maxLength="27"
            defaultValue={data.tagline}
          ></input>
          <textarea
            placeholder="Notes..."
            className={classes.inputBox + " " + classes.notes + " m-1 mt-3"}
            ref={noteRef}
            defaultValue={data.notes}
          />
          <div className={classes.rightAlign}>
            <Button
              className={classes.small + " m-2"}
              onClick={props.handleClose}
            >
              Close
            </Button>
            <Button
              className={" m-2"}
              onClick={() =>
                props.handleAdd({
                  title: titleRef.current.value,
                  tagline: tagRef.current.value,
                  notes: noteRef.current.value,
                  pinned: data.pinned,
                  id: data.id,
                  color: data.color
                })
              }
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default EditNotes;
