import Nav from "./Nav";
import Footer from "./Footer";
import { Box } from "@mui/material";

const Container = () => {
  return (
    <>
      <Box sx={{ height: "95vh" }}>
        <Nav />
      </Box>
      <Footer />
    </>
  );
};

export default Container;
