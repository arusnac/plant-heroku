import {
  Autocomplete,
  Typography,
  CardActions,
  CardHeader,
  Stack,
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
  CardActionArea,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import OpacityIcon from "@mui/icons-material/Opacity";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import Axios from "axios";
import plantInfo from "../assets/plantInfo.json";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadImage from "../components/UploadImage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import App from "../App";
import { deletePlantCard } from "../App";

const filter = createFilterOptions();
const PlantCard = ({
  userName,
  name,
  image,
  location,
  watered,
  id,
  deletePlantCard,
}) => {
  //Toggles the edit options for name and location
  const [editing, setEditing] = useState(false);

  //Hold plant info and reRender on edits
  const [plantName, setPlantName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [waterDate, setWaterDate] = useState(watered);
  const [imagePath, setImagePath] = useState(image);
  const [valueLocation, setValueLocation] = useState(null);

  //Toggles the light info modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const [imageButton, showImageButton] = useState(false);
  const PATH = useSelector((state) => state.user.value.imagePath);

  //handles the the upload image modal
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  let navigate = useNavigate();

  //Set the name and image path from the props
  useEffect(() => {
    setPlantName(name);
    setImagePath(image);
    setValueLocation(location);
    setCurrentId(id);
  }, []);

  //Update the watering date to today
  const updateWatered = (plantId) => {
    const watered = new Date().toLocaleDateString();
    const id = plantId;
    Axios.post(
      "http://localhost:5000/user/water",
      { id: id, watered: watered },
      {
        params: {
          username: userName,
          id: plantId,
        },
      }
    ).then((response) => {
      setWaterDate(watered);
    });
  };

  //Edit the plants name
  const editInfo = (plantId, name, location) => {
    const id = plantId;
    Axios.post(
      "http://localhost:5000/user/edit",
      { id: id, name: name, location: location },
      {
        params: {
          username: userName,
          id: plantId,
        },
      }
    ).then((response) => {
      setPlantName(name);
      setValueLocation(location);
      handleCloseEdit(false);
      setEditing(false);
    });
  };

  const editLocation = (plantId, location) => {
    const id = plantId;
    Axios.post(
      "http://localhost:5000/user/editLocation",
      { id: id, location: location },
      {
        params: {
          username: userName,
          id: plantId,
        },
      }
    ).then((response) => {
      setValueLocation(location);
      handleCloseEdit(false);
      setEditing(false);
    });
  };

  //Upload a new image for the plant
  const editImage = (plantId, PATH) => {
    const id = plantId;
    Axios.post(
      "http://localhost:5000/user/editImage",
      { id: id, imagePath: PATH },
      {
        params: {
          username: userName,
          id: plantId,
        },
      }
    ).then((response) => {
      setImagePath(PATH);
      setOpenEdit(false);
    });
  };

  const deletePlant = () => {
    Axios.post(
      "http://localhost:5000/user/delete",
      { id: id },
      {
        params: {
          username: userName,
        },
      }
    ).then((response) => {
      handleClose();
    });
  };

  //Toggle light modal
  const [light, setLight] = useState("");

  //If the plants light info exists, show in a modal
  const lightInfo = (name) => {
    const plantName = name.toUpperCase();
    setPlantName(plantName);
    if (plantName in plantInfo) {
      setLight(plantInfo[plantName].LIGHT);
    } else {
      setLight("No light information found");
    }
    handleOpen();
  };

  //style for modal
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    { location: "bedroom" },
    { location: "kitchen" },
    { location: "living room" },
  ];

  return (
    <div>
      <Card
        onMouseOut={() => showImageButton(false)}
        onMouseOver={() => showImageButton(true)}
        variant="outlined"
        sx={{
          minWidth: 275,
          maxWidth: 275,
          "&:hover": {},
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: 4,
        }}
      >
        <CardActionArea
          onClick={() =>
            navigate(`/plantpage/${id}`, { userName: userName, id: id })
          }
        >
          <CardHeader
            sx={{ backgroundColor: "#fff" }}
            titleTypographyProps={{ fontWeight: 300 }}
            title={plantName}
          />

          <CardMedia
            onClick={() => navigate(`/plantpage/${id}`)}
            component="img"
            alt="user plant"
            height="280"
            sx={{ marginRight: 5, width: "inherit", boxShadow: 2 }}
            image={imagePath}
          />

          <CardContent>
            <Typography>
              Location: {valueLocation}
              <br />
            </Typography>
            <Typography>Last watered: {waterDate}</Typography>
            {/* <IconButton variant="contained" color="primary"><OpacityIcon /></IconButton> */}
          </CardContent>
        </CardActionArea>
        {/* <Button size="small" variant="contained" color="primary" value={plants.name} onClick={lightInfo}>?</Button> */}
        <CardActions>
          <IconButton
            onClick={() => updateWatered(id)}
            color="primary"
            aria-label="update watering"
          >
            <OpacityIcon />
          </IconButton>
          {imageButton && (
            <>
              <IconButton
                onClick={handleOpenEdit}
                color="success"
                aria-label="uplaod new image"
              >
                <AddPhotoAlternateIcon />
              </IconButton>

              <IconButton
                value={plantName}
                onClick={() => lightInfo(plantName)}
                color="primary"
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      </Card>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {plantName}
          </Typography>
          <UploadImage onChange={() => setImagePath(PATH)} buttonType="text" />
          <Button onClick={() => editImage(id, PATH)}>
            <Typography color="green">Save</Typography>
          </Button>
          <Button onClick={() => handleCloseEdit(false)}>
            <Typography color="red">Cancel</Typography>
          </Button>
        </Box>
      </Modal>

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
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4 }}>
            Are you sure you want to delete this plant?
          </Typography>

          <Button onClick={deletePlantCard} value={id}>
            Confirm
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PlantCard;
