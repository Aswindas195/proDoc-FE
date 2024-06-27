import React, { useState } from "react";
import JSZip from "jszip";
import "./App.css";
import InputFileUpload from "./InputFileUpload";
import IconButton from "@mui/material/IconButton";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // Use the desired icon

function App() {
  const [zipFile, setZipFile] = useState(null);
  const [fileData, setFileData] = useState([]); // State to store file data

  const handleFileUpload = (event) => {
    setZipFile(event.target.files[0]);
  };

  const handleGenerate = async () => {
    if (zipFile) {
      const zip = new JSZip();
      const content = await zip.loadAsync(zipFile);
      const data = []; // Temporary array to store file data

      const validExtensions = [
        ".js",
        ".jsx",
        ".ts",
        ".tsx", // JavaScript/TypeScript
        ".html",
        ".css",
        ".scss", // Web
        ".java",
        ".class", // Java
        ".go", // Golang
        ".py", // Python
        ".sh",
        ".bat", // Scripts
        ".json",
        ".xml",
        ".yaml",
        ".yml", // Config files
        ".md", // Markdown
        ".txt", // Text files
      ];

      for (const relativePath in content.files) {
        const file = content.files[relativePath];
        if (!file.dir && file._data !== null) {
          // Check if file is not a directory and has content
          const extension = relativePath
            .substring(relativePath.lastIndexOf("."))
            .toLowerCase();
          if (validExtensions.includes(extension)) {
            const fileData = await file.async("text");
            data.push({
              path: relativePath,
              content: fileData,
            });
          }
        }
      }

      setFileData(data); // Store all file data in state
      console.log("File data:", data); // Print the file data structure
    } else {
      console.log("No file uploaded.");
    }
  };

  return (
    <div className="App">
      <h1>Upload and Generate File List</h1>
      <InputFileUpload onChange={handleFileUpload} />
      <IconButton color="primary" onClick={handleGenerate}>
        <DescriptionIcon />
      </IconButton>
    </div>
  );
}

export default App;
