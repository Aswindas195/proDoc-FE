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
import CircularProgress from "@mui/material/CircularProgress";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Popover from "@mui/material/Popover";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

const useStyles = (theme) => ({
  popover: {
    padding: theme.spacing(2),
    maxWidth: "80vw",
  },
});

function App() {
  const [zipFile, setZipFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState("");
  const classes = useStyles(theme); // Pass the theme here

  const handleFileUpload = (file) => {
    setZipFile(file);
  };

  const handleRemoveFile = () => {
    setZipFile(null);
    setResponses([]);
  };

  const handleGenerate = async () => {
    if (zipFile) {
      try {
        setLoading(true);
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
                    prompt: `I have a program file in my project. I want you to create a proper description about what is happening in this code. I will be providing you with the file path and the file content. Provide the detailed documentation that you will be provided to be enclosed between the markers "<start>" and "</end>". File path is: ${relativePath} and file content is: ${fileData}`,
                  }),
                });

                if (response.ok) {
                  const responseData = await response.json();
                  setResponses((prevResponses) => [
                    ...prevResponses,
                    { path: relativePath, response: responseData.response },
                  ]);
                } else {
                  console.error("API Error:", response.statusText);
                }
              } catch (error) {
                console.error("Fetch Error:", error);
              }
            }
          }
        }

        setZipFile(null);
        console.log("File data:", data);
      } catch (error) {
        console.error("Error processing ZIP file:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file uploaded.");
    }
  };

  const handlePopoverOpen = (event, response) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent(response);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ThemeProvider theme={theme}>
      {" "}
      {/* Wrap your app with ThemeProvider */}
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
          startIcon={<AutoAwesomeIcon sx={{ color: "#FFD700" }} />}
          sx={{ color: "black", backgroundColor: "lightgrey" }}
          onClick={handleGenerate}
          disabled={loading}
        >
          Generate
        </Button>
        {loading && <CircularProgress />}
        <Box sx={{ mt: 2 }}>
          {responses.map((res, index) => (
            <Box key={index} sx={{ my: 2, textAlign: "left" }}>
              <Typography
                variant="h6"
                onClick={(event) => handlePopoverOpen(event, res.response)}
                style={{ cursor: "pointer" }}
              >
                {res.path}
              </Typography>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box className={classes.popover}>
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {popoverContent}
                  </Markdown>
                </Box>
              </Popover>
            </Box>
          ))}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
