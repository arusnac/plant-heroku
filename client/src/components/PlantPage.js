import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "./Account";
import Axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const PlantPage = () => {
  const theme = useTheme();
  // const username = useSelector((state) => state.user.value.username);
  const [plant, setPlant] = useState({});
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
      console.log(response.data);
      setPlant(response.data);
      // setPlantList(response.data.plants);
    });
  }, []);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card sx={{ display: "flex" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {plant.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Location: {plant.location}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Watered: {plant.watered}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                <Button>Add a personal description.</Button>
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              {/* <IconButton aria-label="previous">
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton aria-label="play/pause">
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>
              <IconButton aria-label="next">
                {theme.direction === "rtl" ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton> */}
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 351 }}
            image={plant.image}
            alt="Live from space album cover"
          />
        </Card>
      </Box>
    </>
  );
};

export default PlantPage;
