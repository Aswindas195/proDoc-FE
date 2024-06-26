import { useState, useRef } from "react";
import JSZip from "jszip";
import {
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function UploadPage() {
  const [zipFile, setZipFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const MAX_SIZE = 50 * 1024 * 1024;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (file && file.type === "application/zip" && file.size <= MAX_SIZE) {
      setZipFile(file);
      setError(null);
    } else if (file.size >= MAX_SIZE) {
      setZipFile(null);
      setError("File Size is over 50MB");
    } else {
      setZipFile(null);
      setError("Please upload a valid .zip file.");
    }
  };

  const handleGenerate = async () => {
    if (zipFile) {
      const zip = new JSZip();
      const content = await zip.loadAsync(zipFile);
      const filesArray = [];

      for (const relativePath in content.files) {
        const file = content.files[relativePath];
        if (!file.dir) {
          const fileContent = await file.async("string");
          filesArray.push({ path: relativePath, content: fileContent });
        }
      }

      setFiles(filesArray.filter((file) => file.content));
    } else {
      setError("Please upload a .zip file first.");
    }
  };

  const handleCancel = () => {
    setZipFile(null);
    setFiles([]);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file);
    setIsDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Container sx={{ mt: 4, borderRadius: "20px", width: "50%" }}>
      <Paper sx={{ p: 5, pt: 4, borderRadius: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Upload and Generate File List
        </Typography>
        <Box
          sx={{
            border: "3px dashed grey",
            borderRadius: "10px",
            p: 2,
            textAlign: "center",
            alignContent: "center",
            mb: 2,
            height: "200px",
            backgroundColor: isDragging ? "red" : "transparent",
            transition: "background-color 0.3s",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <Typography variant="body1" sx={{ mb: 1 }}>
            Upload and attach files to this project.
          </Typography>
          <input
            accept=".zip"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            ref={fileInputRef}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadFileIcon />}
              sx={{
                borderRadius: "10px",
                height: "50px",
                width: "300px",
                fontSize: "18px",
                color: "black",
                border: "2px solid black",
                "&:hover": {
                  border: "2px solid black",
                  backgroundColor: "#f1f1f1",
                },
              }}
            >
              {isDragging ? `Drop here` : `Click to upload`}
            </Button>
          </label>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Maximum file size should be 50MB
          </Typography>
        </Box>
        {zipFile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              border: "2px solid black",
              borderRadius: "10px",
              mb: 2,
            }}
          >
            <Chip label={zipFile.name} sx={{ mr: 1 }} />
            <Typography variant="body2">
              {zipFile.size / (1024 * 1024) < 1
                ? `${(zipFile.size / 1024).toFixed(2)} KB`
                : `${(zipFile.size / (1024 * 1024)).toFixed(2)} MB`}
            </Typography>
            <IconButton onClick={handleCancel} sx={{ ml: "auto" }}>
              <HighlightOffIcon />
            </IconButton>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={!zipFile}
            sx={{
              width: "100%",
              height: "50px",
              backgroundColor: "black",
              borderRadius: "10px",
            }}
            startIcon={<AutoAwesomeIcon />}
          >
            Generate
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{
              width: "100%",
              height: "50px",
              color: "black",
              borderRadius: "10px",
              border: "1px solid grey",
              "&:hover": {
                border: "1px solid black",
                backgroundColor: "#f1f1f1",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
}

export default UploadPage;
