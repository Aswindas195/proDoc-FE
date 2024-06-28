import { Box, Button, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { updateContentByPath } from "../../main/slice/slice";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const files = useSelector((state) => state.result);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Ensure you import useNavigate from react-router-dom

  // Navigate to "/" if files array is empty
  useEffect(() => {
    if (files.length === 0) {
      navigate("/");
    }
  }, [files, navigate]);

  useEffect(() => {
    // Add event listener for beforeunload
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      // Chrome requires returnValue to be set
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Cleanup: remove event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Check if files array has elements before setting initial state
  const initialSelectedFile = files.length > 0 ? files[0] : null;
  const [selectedFile, setSelectedFile] = useState(initialSelectedFile);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (file) => {
    setSelectedFile(file);
  };

  const handleRegenerate = async () => {
    try {
      setIsLoading(true);
      const apiUrl = "http://10.4.4.28:5000/chat";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `I have a program file in my project. I want you to create a proper description about what is happening in this code. I will be providing you with the file path and the file content. Provide the detailed documentation that you will be provided to be enclosed between the markers "<start>" and "</end>". File path is: ${selectedFile?.path} and file content is: ${selectedFile?.content}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);

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

  return (
    <Box sx={{ padding: "70px" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginRight: "20px" }}
        >
          {files.map((file, index) => (
            <Button
              key={index}
              sx={{
                wordBreak: "break-word",
                backgroundColor: selectedFile?.path === file.path && "black",
                color: selectedFile?.path === file.path ? "white" : "black",
                marginBottom: "10px",
                width: "250px",
                borderRadius: "10px",
                border: "1px solid black",
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "10px",
                color: "black",
                border: "1px solid black",
                "&:hover": {
                  border: "1px solid black",
                  backgroundColor: "#f1f1f1",
                },
              }}
              onClick={handleRegenerate}
              disabled={isLoading}
            >
              {isLoading ? `Regenerating...` : `Regenerate`}
            </Button>
          </Box>
          <Box sx={{ overflowY: "auto", height: "calc(100vh - 360px)", px: 2 }}>
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
