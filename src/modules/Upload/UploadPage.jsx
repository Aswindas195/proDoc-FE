import { useState } from "react";
import JSZip from "jszip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import { Box } from "@mui/material";

function UploadPage() {
  const [zipFile, setZipFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
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

  files.map((file) => console.log(file.path, file.content));

  return (
    <Container maxWidth="sm" sx={{ borderRadius: "40px" }}>
      <Paper
        style={{ padding: "20px", marginTop: "20px", borderRadius: "10px" }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Upload and Generate File List
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box>
            <Input
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
              inputProps={{ id: "file-upload" }}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={error}
            >
              Generate
            </Button>
          </Box>
        </Box>
        {error && (
          <Typography
            variant="body1"
            color="error"
            style={{ marginTop: "10px" }}
          >
            {error}
          </Typography>
        )}
        {/* {files.length > 0 && (
          <div style={{ marginTop: "20px" }}>
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
          </div>
        )} */}
      </Paper>
    </Container>
  );
}

export default UploadPage;
