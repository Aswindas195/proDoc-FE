import { Box } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const NavBar = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "80px",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Box
        sx={{
          fontSize: "30px",
          py: 3,
          px: 5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <DescriptionOutlinedIcon sx={{ fontSize: "35px" }} />
        ProDoc.
      </Box>
    </Box>
  );
};

export default NavBar;
