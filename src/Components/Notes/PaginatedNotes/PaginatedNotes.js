import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "./PaginatedNotes.module.css";

import {
  query,
  collection,
  onSnapshot,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";

import EditNotes from "../EditNotes/EditNotes";
import Note from "../Note/Note";

function PaginatedNotes({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (note) => {
    setShow(true);
    setEdit(note);
  };

  async function handleAdd(note) {
    await setDoc(doc(db, "Notes", note.id), {
      title: note.title,
      tagline: note.tagline,
      notes: note.notes,
      pinned: note.pinned,
      color: note.color,
    });
    handleClose();
  }

  useEffect(() => {
    const q = query(collection(db, "Notes"), orderBy("pinned"));
    onSnapshot(q, (querySnapshot) => {
      setData(
        querySnapshot.docs.map((doc) => {
          let data = doc.data();
          data.id = doc.id;
          return data;
        })
      );
    });
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div className={classes.wrap}>
      <div className={classes.notesList + " mt-2 p-2"}>
        <div className={classes.container}>
          {currentItems &&
            currentItems.map((note) => {
              return <Note key={note.id} note={note} handleShow={handleShow} />;
            })}

          <EditNotes
            show={show}
            data={edit}
            handleClose={handleClose}
            handleAdd={handleAdd}
          />
        </div>
      </div>
      <div className={classes.center}>
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          previousClassName={classes.circle + " m-1 " + classes.next}
          nextClassName={classes.circle + " m-1 " + classes.next}
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName={classes.pagination}
          activeClassName={classes.circle + " m-1 " + classes.active}
          pageClassName={classes.circle + " m-1 " + classes.page}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default PaginatedNotes;
