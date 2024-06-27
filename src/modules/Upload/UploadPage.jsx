import React, { useState } from "react";
import JSZip from "jszip";
import {
  Button,
  Typography,
  Container,
  Paper,
  Input,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function UploadPage() {
  const [zipFile, setZipFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/zip") {
      setZipFile(file);
      setError(null);
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

      setFiles(filesArray);
    } else {
      setError("Please upload a .zip file first.");
    }
  };

  console.log(files);

  return (
    <Container maxWidth="sm" sx={{ borderRadius: "10px", mt: 4 }}>
      <Paper sx={{ p: 2, borderRadius: "10px" }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Upload and Generate File List
        </Typography>
        <Box
          sx={{
            border: "1px dashed grey",
            borderRadius: "5px",
            p: 2,
            textAlign: "center",
            mb: 2,
          }}
        >
          <Typography variant="body2" gutterBottom>
            Upload and attach files to this project.
          </Typography>
          <input
            accept=".zip"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload">
            <Button
              variant="outlined"
              component="span"
              startIcon={<UploadFileIcon />}
            >
              Click to upload or drag and drop
            </Button>
          </label>
        </Box>
        {zipFile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              border: "1px solid #ccc",
              borderRadius: "5px",
              mb: 2,
            }}
          >
            <Chip label={zipFile.name} sx={{ mr: 1 }} />

            <IconButton onClick={() => setZipFile(null)} sx={{ ml: "auto" }}>
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
            sx={{ width: "100%" }}
          >
            Generate
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setZipFile(null);
              setFiles([]);
              setError(null);
            }}
            sx={{ width: "100%" }}
          >
            Cancel
          </Button>
        </Box>
        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {files.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              Extracted Files
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {files.map((file, index) => (
                <li key={index}>
                  <Typography variant="subtitle1">{file.path}</Typography>
                  <pre>{file.content}</pre>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default UploadPage;
