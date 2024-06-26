import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadPage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="50%"
      height="50%"
      borderRadius="10px"
      padding="20px"
      onDrop={handleFileDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        id="file-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button
          component="span"
          variant="outlined"
          color="primary"
          startIcon={<CloudUploadIcon />}
          sx={{
            width: "400px",
            height: "60px",
            border: "2px solid #007bff",
            fontSize: "24px",
          }}
        >
          Choose Files
        </Button>
      </label>
      <Typography variant="body2" color="textSecondary" mt={2}>
        or drop files here
      </Typography>
      {file && (
        <Typography variant="body2" color="textPrimary" mt={2}>
          {file.name}
        </Typography>
      )}
    </Box>
  );
};

export default UploadPage;
