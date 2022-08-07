import { Box, AppBar } from "@mui/material/";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#6c8c6f",
          width: "auto",
          height: "5vh",
          display: { xs: "none", md: "block" },
        }}
      ></Box>
    </>
  );
};

export default Footer;
