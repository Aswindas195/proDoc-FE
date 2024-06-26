import { Button as MuiButton } from "@mui/material";

const Button = ({ styles, text, onClick }) => {
  return (
    <MuiButton
      sx={{
        color: "red",
        backgroundColor: "yellow",
        "&:hover": {
          backgroundColor: "green",
        },
        "&:disabled": {
          backgroundColor: "gray",
        },

        ...styles,
      }}
      onClick={onClick}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
