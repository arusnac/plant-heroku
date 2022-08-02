import { Typography, Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";

const Note = ({
  title,
  body,
  idx,
  plantId,
  username,
  deleteNoteConfirmation,
}) => {
  const [deleteNote, setDeleteNote] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [noteBodyValue, setNoteBodyValue] = useState("");
  const [newTitleValue, setNewTitleValue] = useState("");
  const [newNoteBodyValue, setNewNoteBodyValue] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [openEdit, setEditOpen] = useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => {
    setEditOpen(false);
  };

  useEffect(() => {
    setTitleValue(title);
    setNoteBodyValue(body);
  }, []);

  const editNote = () => {
    setTitleValue(newTitleValue ? newTitleValue : titleValue);
    setNoteBodyValue(newNoteBodyValue ? newNoteBodyValue : noteBodyValue);
    Axios.post("http://localhost:5000/user/note", {
      id: plantId,
      noteTitle: newTitleValue ? newTitleValue : titleValue,
      noteBody: newNoteBodyValue ? newNoteBodyValue : noteBodyValue,
      username,
      toDo: "update",
      idx,
    }).then((response) => {
      console.log(response);
    });

    handleEditClose();
  };

  const style = {
    display: "flex",
    flexDirection: "rows",
    alignItems: "center",
  };

  //style for modal
  const styleModal = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    gap: 1,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Box
        style={style}
        onMouseEnter={() => setDeleteNote(true)}
        onMouseLeave={() => setDeleteNote(false)}
      >
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ paddingRight: "5px", fontWeight: 700 }}
        >
          {titleValue}:{" "}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{ paddingRight: "20px" }}
        >
          {" "}
          {noteBodyValue}
        </Typography>
        {deleteNote && (
          <div>
            <Button
              onClick={handleOpen}
              variant="text"
              color="warning"
              size="small"
            >
              Remove
            </Button>
            <Button onClick={handleEditOpen} variant="text" size="small">
              Edit
            </Button>
          </div>
        )}
      </Box>

      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="confirm-deletion"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {idx}
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
            Edit your note.
          </Typography>
          <TextField
            id="outlined-textarea"
            label="Title (optional)"
            defaultValue={titleValue}
            multiline
            onChange={(newValue) => {
              setNewTitleValue(newValue.target.value);
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Notes"
            defaultValue={noteBodyValue}
            multiline
            rows={4}
            onChange={(newValue) => {
              setNewNoteBodyValue(newValue.target.value);
            }}
          />
          <Button color="warning" onClick={editNote}>
            Confirm
          </Button>
          <Button onClick={handleEditClose}>Cancel</Button>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-deletion"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            {idx}
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
            Are you sure you want to delete this note?
          </Typography>

          <Button
            color="warning"
            onClick={() => {
              deleteNoteConfirmation(idx);
              handleClose();
            }}
            value={idx}
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </>
  );
};

export default Note;
