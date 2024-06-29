import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Box,
  Button,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import JSZip from "jszip";
import { updateContentByPath } from "../../main/slice/slice";

const ResultsPage = () => {
  const files = useSelector((state) => state.result);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (files.length === 0) {
      navigate("/");
    }
  }, [files, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const initialSelectedFile = files.length > 0 ? files[0] : null;
  const [selectedFile, setSelectedFile] = useState(initialSelectedFile);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (file) => {
    setSelectedFile(file);
  };

  const handleRegenerate = async () => {
    try {
      setIsLoading(true);
      const apiUrl = "http://10.4.4.56:8080/api/upload";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: selectedFile?.path,
          content: selectedFile?.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      dispatch(
        updateContentByPath({
          path: selectedFile?.path,
          description: responseData?.response,
          content: selectedFile?.content,
        })
      );
      setSelectedFile((prevSelectedFile) => ({
        ...prevSelectedFile,
        description: responseData?.response,
      }));
    } catch (error) {
      console.error("Error during regenerate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadCurrent = () => {
    if (selectedFile) {
      const element = document.createElement("a");
      const file = new Blob([selectedFile.description], {
        type: "text/plain",
      });
      element.href = URL.createObjectURL(file);
      element.download = `${selectedFile.path}.md`;
      document.body.appendChild(element);
      element.click();
    }
    handleMenuClose();
  };

  const handleDownloadAll = () => {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(`${file.path}.md`, file.description || "");
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = "files.zip";
      document.body.appendChild(element);
      element.click();
    });
    handleMenuClose();
  };

  return (
    <Box sx={{ padding: "70px" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginRight: "20px",
            gap: 1,
            height: "calc(100vh - 240px)",
            overflow: "auto",
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ccc",
              borderRadius: "10px",
              border: "3px solid transparent",
              backgroundClip: "content-box",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#aaa",
            },
          }}
        >
          {files.map((file, index) => (
            <Button
              key={index}
              sx={{
                wordBreak: "break-word",
                backgroundColor:
                  selectedFile?.path === file.path ? "black" : "white",
                color: selectedFile?.path === file.path ? "white" : "black",
                marginBottom: "10px",
                marginRight: 1,
                borderRadius: "10px",
                border: "none",
                boxShadow: "2px 2px 2px 1px #e1e1e1",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: selectedFile?.path === file.path && "black",
                },
              }}
              onClick={() => handleClick(file)}
            >
              {file?.path}
            </Button>
          ))}
        </Box>
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
            width: "100%",
            height: "calc(100vh - 280px)",
            overflowY: "auto",
            wordBreak: "break-word",
            borderRadius: "15px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mx: 2,
            }}
          >
            <Typography sx={{ fontSize: "30px", fontWeight: "600" }}>
              Description
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Tooltip title={"Regenerate"}>
                <IconButton
                  aria-label="regenerate"
                  onClick={handleRegenerate}
                  sx={{
                    color: "black",
                  }}
                  disabled={isLoading}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Download"}>
                <IconButton
                  aria-label="download"
                  onClick={handleMenuOpen}
                  sx={{
                    color: "black",
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleDownloadCurrent}>
                  Download Current File
                </MenuItem>
                <MenuItem onClick={handleDownloadAll}>
                  Download All as Zip
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box
            sx={{
              overflowY: "auto",
              height: "calc(100vh - 360px)",
              px: 2,
              "&::-webkit-scrollbar": {
                width: "12px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: "10px",
                border: "3px solid transparent",
                backgroundClip: "content-box",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#aaa",
              },
            }}
          >
            <Markdown remarkPlugins={[remarkGfm]}>
              {selectedFile?.description}
            </Markdown>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResultsPage;
