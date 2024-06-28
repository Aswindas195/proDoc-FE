import { Box } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

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
      <Box
        sx={{
          fontSize: "45px",
          py: 3,
          px: 5,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <DescriptionOutlinedIcon sx={{ fontSize: "40px" }} />
        ProDoc.
      </Box>
    </Box>
  );
};

export default NavBar;
