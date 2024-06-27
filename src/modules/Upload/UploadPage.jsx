import { useState } from "react";
import JSZip from "jszip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";

function UploadPage() {
  const [zipFile, setZipFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    setZipFile(event.target.files[0]);
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
      console.log("No file uploaded.");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Upload and Generate File List
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Input
              type="file"
              accept=".zip"
              onChange={handleFileUpload}
              inputProps={{ id: "file-upload" }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleGenerate}>
              Generate
            </Button>
          </Grid>
        </Grid>
        {files.length > 0 && (
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
        )}
      </Paper>
    </Container>
  );
}

export default UploadPage;
