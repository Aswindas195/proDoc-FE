import { Box } from "@mui/material";
import NavBar from "../../components/atoms/NavBar";

const Layout = ({ children }) => {
  return (
    <Box
      component={"div"}
      sx={{
        backgroundColor: "#F7F5F0",
        height: "100vh",
        width: "100vw",
        overflowY: "auto",
      }}
    >
      <NavBar />
      {children}
    </Box>
  );
};

export default Layout;
