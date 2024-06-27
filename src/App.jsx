import React, { useState } from "react";
import JSZip from "jszip";
import "./App.css";

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
        console.log(relativePath, file);
      });
    } else {
      console.log("No file uploaded.");
    }
  };

  return (
    <div className="App">
      <h1>Upload and Generate File List</h1>
      <input type="file" accept=".zip" onChange={handleFileUpload} />
      <button onClick={handleGenerate}>Generate</button>
    </div>
  );
}

export default App;
