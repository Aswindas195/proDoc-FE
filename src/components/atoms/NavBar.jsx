import { Box } from "@mui/material";

const NavBar = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100px",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Box sx={{ fontSize: "45px", py: 3, px: 5 }}>ProDoc.</Box>
    </Box>
  );
};

export default NavBar;
