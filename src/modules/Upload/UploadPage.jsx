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

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { CloudUpload } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFiles, setFiles } from "../../main/slice/slice"; // Adjust the import path as necessary

function UploadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [zipFile, setZipFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const MAX_SIZE = 50 * 1024 * 1024;

  dispatch(removeFiles());

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
      try {
        setLoading(true);
        const zip = new JSZip();
        const content = await zip.loadAsync(zipFile);

        const validExtensions = [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".html",
          ".css",
          ".scss",
          ".java",
          ".class",
          ".go",
          ".py",
          ".sh",
          ".bat",
          ".json",
          ".xml",
          ".yaml",
          ".yml",
          ".md",
          ".txt",
        ];

        for (const relativePath in content.files) {
          const file = content.files[relativePath];
          if (!file.dir) {
            const extension = relativePath
              .substring(relativePath.lastIndexOf("."))
              .toLowerCase();
            if (validExtensions.includes(extension)) {
              const fileContent = await file.async("string");
              console.log(fileContent, relativePath);

              // Example of how you might handle the API call, if needed
              const apiUrl = "http://10.4.4.56:8080/api/upload"; // Replace with your backend URL
              const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  path: relativePath,
                  content: fileContent,
                }),
              });
              const responseData = await response.json();
              dispatch(
                setFiles({
                  path: relativePath,
                  description: responseData?.response,
                  content: fileContent,
                })
              );
            }
          }
        }

        setZipFile(null);
        navigate("/results");
      } catch (error) {
        console.error("Error processing ZIP file:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No file uploaded.");
    }
  };

  const handleCancel = () => {
    setZipFile(null);
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
      }}
    >
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
              backgroundColor: isDragging ? "#f1f1f1" : "transparent",
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
                sx={{
                  borderRadius: "10px",
                  fontSize: "18px",
                  color: "black",
                  border: "none",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "#f1f1f1",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <CloudUpload sx={{ fontSize: "45px" }} />
                  Click here or Drop your files here
                </Box>
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
              disabled={!zipFile || loading}
              sx={{
                width: "100%",
                height: "50px",
                backgroundColor: "black",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
              startIcon={<AutoAwesomeIcon />}
            >
              {loading ? "Generating..." : "Generate"}
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
    </Box>
  );
}

export default UploadPage;
