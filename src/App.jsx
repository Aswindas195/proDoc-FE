import React, { useState } from "react";
import JSZip from "jszip";
import "./App.css";
import InputFileUpload from "./InputFileUpload";
import IconButton from "@mui/material/IconButton";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"; // Use the desired icon

function App() {
  const [zipFile, setZipFile] = useState(null);

  const handleFileUpload = (event) => {
    setZipFile(event.target.files[0]);
  };

  const handleGenerate = async () => {
    if (zipFile) {
      const zip = new JSZip();
      const content = await zip.loadAsync(zipFile);

      content.forEach((relativePath, file) => {
        console.log(relativePath);
      });
    } else {
      console.log("No file uploaded.");
    }
  };

  return (
    <div className="App">
      <h1>Upload and Generate File List</h1>
      <InputFileUpload onChange={handleFileUpload} />
      <IconButton color="secondary" onClick={handleGenerate}>
        Generate
        <AutoAwesomeIcon />
      </IconButton>
    </div>
  );
}

export default App;
