import Nav from "./Nav";
import Footer from "./Footer";
import OpacityIcon from "@mui/icons-material/Opacity";
import { styled } from "@mui/material/styles";
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
  Paper,
} from "@mui/material";

const style = {
  width: { xs: "300px", md: "600px" },
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),

  color: theme.palette.text.primary,
}));

const About = () => {
  return (
    <>
      <Box>
        <Nav />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            mt: 2,
          }}
        >
          <Item>
            <Box sx={style}>
              <Stack spacing={4}>
                <div>
                  <Typography
                    sx={{ textAlign: "center" }}
                    gutterBottom
                    variant="h4"
                  >
                    ABOUT
                  </Typography>

                  <Typography color="text.secondary" variant="h5">
                    Plants!! can be used to build an online collection of your
                    plants. Give it a name, location, picture and easily view
                    them and the progress they've made through the years.
                  </Typography>
                </div>
                <div>
                  <Typography
                    sx={{ textAlign: "center" }}
                    gutterBottom
                    variant="h4"
                  >
                    Plants
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    On the homepage you can update watering (see more below),
                    upload a new image for any plant, or select the plant and
                    view the specific plant page. On the plant's page you can
                    edit the plant'ss name, location, or add notes. To add notes
                    simply click the Add Note button. Add a title (optional) and
                    note. You can however over the notes to remove or edit them.
                  </Typography>
                </div>
                <div>
                  <Typography
                    sx={{ textAlign: "center" }}
                    gutterBottom
                    variant="h4"
                  >
                    Watering
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    When you add a new plant to your collection select the date
                    it was last watered or leave blank to set the watering date
                    to today. Next time it's watered use the water droplet
                    button (
                    <OpacityIcon color="primary" />) to update it.
                  </Typography>
                </div>
                <div>
                  <Typography
                    sx={{ textAlign: "center" }}
                    gutterBottom
                    variant="h4"
                  >
                    Upcoming Features
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    We will be adding a user profile section that you can
                    customize and tailor certain settings of the application to
                    your liking. In addition we'll be adding plant specific
                    information such as care info, watering needs, and light
                    needs.
                    <br />
                    <br />
                    Further down the line we'd like to add a social aspect and
                    marketplace where you can buy and sell!
                  </Typography>
                </div>

                <Typography variant="h5"></Typography>
              </Stack>
            </Box>
          </Item>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default About;
