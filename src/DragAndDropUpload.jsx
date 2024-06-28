import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const DragAndDropUpload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed gray",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: isDragActive ? "lightblue" : "",
        color: "white",
        width: "600px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto", // Center the box horizontally
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon
        sx={{ fontSize: 40, marginBottom: "10px", color: "black" }}
      />
      <Typography variant="body1" sx={{ color: "black" }}>
        {isDragActive
          ? "Drop the files here..."
          : "Drag & drop a file here, or click to select a file"}
      </Typography>
    </Box>
  );
};

export default DragAndDropUpload;
