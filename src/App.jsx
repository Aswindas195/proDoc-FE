import React, { useState } from "react";
import JSZip from "jszip";
import "./App.css";
import InputFileUpload from "./InputFileUpload"; // Assuming InputFileUpload.jsx is in the same directory

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
      <InputFileUpload onChange={handleFileUpload} />{" "}
      {/* Use Material-UI upload button */}
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default App;
