import React, { useState } from "react";
import JSZip from "jszip";
import "./App.css";
import DragAndDropUpload from "./DragAndDropUpload";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const [zipFile, setZipFile] = useState(null);
  const [fileData, setFileData] = useState([]);

  const handleFileUpload = (file) => {
    setZipFile(file);
  };

  const handleRemoveFile = () => {
    setZipFile(null);
    setFileData([]);
  };

  const handleGenerate = async () => {
    if (zipFile) {
      try {
        const zip = new JSZip();
        const content = await zip.loadAsync(zipFile);
        const data = [];

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
          if (!file.dir && file._data !== null) {
            const extension = relativePath
              .substring(relativePath.lastIndexOf("."))
              .toLowerCase();
            if (validExtensions.includes(extension)) {
              const fileData = await file.async("text");
              data.push({ path: relativePath, content: fileData });

              // Make API call for each valid file
              const apiUrl = "http://127.0.0.1:5000/chat"; // Replace with your backend URL
              try {
                const response = await fetch(apiUrl, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    prompt: `I have a program file in my project. I want you to create a proper description about what is happening in this code. I will be providing you with the file path and the file content.Provide the detailed documentation that you will be provided to be enclosed between the markers "<start>" and "</end>".File path is: ${relativePath} and file content is: ${fileData}`,
                  }),
                });

                if (response.ok) {
                  const responseData = await response.json();
                  console.log("API Response:", responseData);
                } else {
                  console.error("API Error:", response.statusText);
                }
              } catch (error) {
                console.error("Fetch Error:", error);
              }
            }
          }
        }

        setFileData(data);
        console.log("File data:", data);
      } catch (error) {
        console.error("Error processing ZIP file:", error);
      }
    } else {
      console.log("No file uploaded.");
    }
  };

  return (
    <div className="App">
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ marginLeft: 1 }}
          >
            ProDoc.
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className="content">
        <h1>Upload and Generate File List</h1>
        <DragAndDropUpload onFileUpload={handleFileUpload} />
        {zipFile && (
          <IconButton color="secondary" onClick={handleRemoveFile}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <Button
        variant="outlined"
        startIcon={<AutoAwesomeIcon sx={{ color: " #FFD700" }} />}
        sx={{ color: "black", backgroundColor: "lightgrey" }}
        onClick={handleGenerate} // Call handleGenerate on button click
      >
        Generate
      </Button>
    </div>
  );
}

export default App;
