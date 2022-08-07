import Nav from "./Nav";
import Footer from "./Footer";
import { AccountContext } from "./Account";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState, useContext } from "react";

const style = {
  display: "flex",
  flexDirection: "rows",
  alignItems: "center",
  textAlign: "center",
  gap: "10px",
  borderBottom: "solid",
  borderWidth: "1px",
  width: "100%",
  marginBottom: "10px",
  paddingBottom: "10px",
  marginTop: "10px",
};

const UserAccount = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassRetype, setNewPassRetype] = useState("");

  const { getUser, ChangePassword } = useContext(AccountContext);
  const user = getUser();

  const change = () => {
    console.log(oldPass, newPass, newPassRetype);
    if (newPass !== newPassRetype)
      alert("Your retyped new password does not match");
    else ChangePassword({ old_password: oldPass, password: newPass });
  };

  return (
    <>
      <Box sx={{ height: { xs: "100%", md: "95vh" } }}>
        <Nav />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Box sx={{ width: { md: "600px", xs: "300px" } }}>
            <Typography
              sx={{
                borderBottom: "solid",
                paddingBottom: "10px",
              }}
              variant="h5"
            >
              General Account Settings
            </Typography>
            {/* To be added later
            
            <div style={style}>
              <Typography>Username:</Typography>
              <Typography>arusnac</Typography>
              <Button
                sx={{ marginLeft: "auto", marginRight: "0" }}
                size="small"
              >
                Change Username
              </Button>
            </div> */}
            <div style={style}>
              <Typography>Username:</Typography>
              <Typography>{user.username}</Typography>
            </div>
            <Typography
              sx={{
                borderBottom: "solid",
                paddingBottom: "10px",
                paddingTop: "20px",
              }}
              variant="h5"
            >
              Security Settings
            </Typography>
            <div>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Change Password</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "inherit",
                    textAlign: "center",
                    gap: "20px",
                  }}
                >
                  <TextField
                    type="password"
                    required
                    label="Old Password"
                    onChange={(event) => {
                      setOldPass(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    type="password"
                    required
                    label="New Password"
                    onChange={(event) => {
                      setNewPass(event.target.value);
                    }}
                  ></TextField>
                  <TextField
                    type="password"
                    required
                    label="Retype New Password"
                    onChange={(event) => {
                      setNewPassRetype(event.target.value);
                    }}
                  ></TextField>
                  <Button onClick={change}>Submit</Button>
                </AccordionDetails>
              </Accordion>
            </div>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default UserAccount;
