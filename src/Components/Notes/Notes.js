import React from "react";
import classes from "./Notes.module.css";

import AddNotes from "./AddNotes/AddNotes";
import PaginatedNotes from "./PaginatedNotes/PaginatedNotes";

function Notes() {

  return (
    <div className={classes.notes + " mt-2 mb-3 p-2"}>
      <AddNotes />
      <PaginatedNotes itemsPerPage={6}/>
    </div>
  );
}

export default Notes;
