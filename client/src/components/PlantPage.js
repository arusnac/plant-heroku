import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../App.module.css";
import { AccountContext } from "./Account";
import Axios from "axios";
import Nav from "./Nav";
import Note from "./Note";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { createFilterOptions } from "@mui/material/Autocomplete";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Button,
  CardActionArea,
  CardActions,
  TextField,
  Stack,
  Autocomplete,
  Modal,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Footer from "./Footer";
const filter = createFilterOptions();

const PlantPage = () => {
  //Show the input fields when the user selects the edit button
  const [editing, setEditing] = useState(false);

  //Contains the user added notes
  const [noteList, setNoteList] = useState([]);

  //States for the user added notes
  const [titleValue, setTitleValue] = useState("");
  const [noteBodyValue, setNoteBodyValue] = useState("");

  //Set state to the specific plant loaded
  const [plant, setPlant] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  //State for updating the plants location
  const [valueLocation, setValueLocation] = useState(null);

  //Hold plant info and reRender on edits
  const [plantName, setPlantName] = useState("");

  //State and function to manage the modals
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  //Close the note deletion window after confimration
  const [confimationWindow, setConfirmationWindow] = useState(false);

  const theme = useTheme();
  //const username = useSelector((state) => state.user.value.username);
  //const userName = useLocation();

  let params = useParams();
  const URL = "http://localhost:5000/user/plant";
  const { getUser } = useContext(AccountContext);
  const username = getUser();

  useEffect(() => {
    Axios.get(URL, {
      params: {
        username: username.username,
        id: params.plantId,
      },
    }).then((response) => {
      setPlant(response.data);
      setPlantName(response.data.name);
      setNoteList(response.data.notes);
      setValueLocation(response.data.location);
    });
  }, []);

  const saveNote = (noteTitle, noteBody) => {
    Axios.post("http://localhost:5000/user/note", {
      id: plant._id,
      noteTitle,
      noteBody,
      username,
      toDo: "add",
    }).then((response) => {
      if (noteList)
        setNoteList((noteList) => [...noteList, { noteTitle, noteBody }]);
      else setNoteList([{ noteTitle, noteBody }]);
      console.log(noteList);
      setTitleValue(noteTitle);
      setNoteBodyValue(noteBody);
      handleClose(false);
    });
  };

  //Edit the plants name
  const editInfo = (name, location) => {
    Axios.post(
      "http://localhost:5000/user/edit",
      { id: plant._id, name: plantName, location: valueLocation },
      {
        params: {
          username: username,
          id: plant._id,
        },
      }
    ).then((response) => {
      console.log(response);
      setPlantName(name);
      setValueLocation(location);
      handleCloseEdit(false);
      setEditing(false);
    });
  };

  const handleChange = (e) => {
    console.log(e);
  };

  const deleteNoteConfirmation = (idx) => {
    Axios.post("http://localhost:5000/user/delete", {
      username,
      idx,
      id: plant._id,
      toDelete: "note",
    }).then((response) => {
      setConfirmationWindow(false);
    });
    console.log(`LIST: ${noteList}`);
    if (idx !== -1) {
      console.log(`INDEX: ${idx}`);
      setNoteList([
        ...noteList.slice(0, idx),
        ...noteList.slice(idx + 1, noteList.length),
      ]);
    }

    // setPlantList([
    //   ...plantList.slice(0, index),
    //   ...plantList.slice(index + 1, plantList.length),
    // ]);
  };

  //style for modal
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //Test data for the input boxes
  const plantData = [
    { name: "AFRICAN VIOLET PLANT" },
    { name: "AGAVE PLANT" },
    { name: "ALOCASIA" },
    { name: "ALOCASIA – JEWEL ALOCASIA" },
    { name: "ALOE VERA PLANT" },
    { name: "AMARYLLIS" },
    { name: "ANGEL WING BEGONIA" },
    { name: "ANTHURIUM" },
    { name: "ARALIA PLANT" },
    { name: "ARALIA PLANT – BALFOUR" },
    { name: "ARECA PALM" },
    { name: "ARROWHEAD PLANT" },
    { name: "ASPARAGUS FERN" },
    { name: "AZALEA" },
    { name: "BABY’S TEARS PLANT" },
    { name: "BAMBOO PALM" },
    { name: "BEGONIA PLANT" },
    { name: "TERRARIUM" },
    { name: "WANDERING JEW PLANT" },
    { name: "YUCCA PLANT" },
    { name: "ZAMIOCULCAS ZAMIIFOLIA - ZZ PLANT" },
    { name: "ZEBRA PLANT" },
  ];

  const options = [
    { location: "Bedroom" },
    { location: "Kitchen" },
    { location: "Living Room" },
    { location: "Dining Room" },
  ];

  return (
    <>
      <Nav />
      <Box sx={{ height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <Card sx={{ maxWidth: { xs: 345, md: 650 } }}>
            <CardMedia component="img" image={plant.image} alt="green iguana" />
            <CardContent>
              {editing ? (
                <>
                  <Stack spacing={2}>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      options={plantData.map((option) => option.name)}
                      renderInput={(params) => (
                        <TextField label="Name" {...params} />
                      )}
                      value={plantName}
                      inputValue={plantName}
                      sx={{ width: "inherit" }}
                      onInputChange={(event, newInputValue) => {
                        setPlantName(newInputValue);
                        // editInfo(id, newInputValue)
                      }}
                      onKeyDown={(event, newInputValue) => {
                        if (event.key === "Enter") {
                          // Prevent's default 'Enter' behavior.
                          editInfo(plantName, valueLocation);
                          //editLocation(valueLocation);
                          setEditing(false);
                        }
                      }}
                    />
                    <Autocomplete
                      value={valueLocation}
                      onInputChange={(event, newLocation) => {
                        setValueLocation(newLocation);
                      }}
                      onChange={(event, newValue) => {
                        if (typeof newValue === "string") {
                          setValueLocation(newValue);
                          console.log("first", valueLocation);
                        } else if (newValue && newValue.inputValue) {
                          // Create a new value from the user input
                          setValueLocation(newValue.location);
                          console.log(typeof newValue);
                        } else {
                          setValueLocation(newValue.location);
                          console.log("third", newValue);
                        }
                      }}
                      filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        const { inputValue } = params;
                        // Suggest the creation of a new value
                        const isExisting = options.some(
                          (option) => inputValue === option.title
                        );
                        if (inputValue !== "" && !isExisting) {
                          filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                          });
                        }

                        return filtered;
                      }}
                      selectOnFocus
                      clearOnBlur
                      handleHomeEndKeys
                      id="free-solo-with-text-demo"
                      options={options}
                      getOptionLabel={(option) => {
                        // Value selected with enter, right from the input
                        if (typeof option === "string") {
                          return option;
                        }
                        // Add "xxx" option created dynamically
                        if (option.inputValue) {
                          return option.inputValue;
                        }
                        // Regular option
                        return option.location;
                      }}
                      renderOption={(props, option) => (
                        <li {...props}>{option.location}</li>
                      )}
                      sx={{ width: "inherit" }}
                      freeSolo
                      renderInput={(params) => (
                        <TextField {...params} label="Location" value="test" />
                      )}
                    />
                  </Stack>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "rows",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {plantName}
                    </Typography>
                    {!editing && (
                      <IconButton onClick={() => setEditing(true)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Typography
                    fontWeight={700}
                    variant="body1"
                    color="text.primary"
                  >
                    Location
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    {valueLocation}
                  </Typography>
                </>
              )}
              {editing && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "rows",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    onClick={() => setEditing(!editing)}
                    color="error"
                    aria-label=""
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => editInfo(plantName, valueLocation)}
                    color="success"
                    aria-label=""
                  >
                    <CheckCircleIcon />
                  </IconButton>
                </Box>
              )}
              <Typography fontWeight={700} variant="body1" color="text.primary">
                Watered
              </Typography>
              <Typography gutterBottom variant="body1" color="text.primary">
                {plant.watered}
              </Typography>
              {noteList && (
                <Typography
                  fontWeight={700}
                  gutterBottom
                  variant="body1"
                  color="text.primary"
                  sx={{ textDecoration: "underline" }}
                >
                  Notes
                </Typography>
              )}
              {
                //Display the user added notes
                noteList.map((note, index) => {
                  const key = Math.random();
                  return (
                    <Note
                      key={key}
                      title={note.noteTitle}
                      body={note.noteBody}
                      idx={index}
                      plantId={plant._id}
                      username={username.username}
                      deleteNoteConfirmation={deleteNoteConfirmation}
                      saveNote={saveNote}
                    />
                  );
                })
              }
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button onClick={handleOpen} size="small" color="primary">
                Add notes
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-deletion"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {plantName}
          </Typography>
          <Button
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
          >
            X
          </Button>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Add a note
          </Typography>

          <TextField
            id="outlined-textarea"
            label="Title (optional)"
            placeholder="E.g. Watering Frequency"
            multiline
            onChange={(newValue) => {
              setTitleValue(newValue.target.value);
            }}
          />
          <TextField
            id="outlined-multiline-static"
            label="Notes"
            placeholder="E.g. Once a week."
            multiline
            rows={4}
            onChange={(newValue) => {
              setNoteBodyValue(newValue.target.value);
            }}
          />
          <Button
            onClick={() => saveNote(titleValue, noteBodyValue)}
            value={"test"}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PlantPage;
