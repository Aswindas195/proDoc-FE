import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const ResultsPage = () => {
  const files = useSelector((state) => state.result);

  // Check if files array has elements before setting initial state
  const initialSelectedFile = files.length > 0 ? files[0] : null;
  const [selectedFile, setSelectedFile] = useState(initialSelectedFile);

  const handleClick = (file) => {
    setSelectedFile(file);
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
              variant="contained"
              sx={{
                marginBottom: "10px",
                width: "250px",
                borderRadius: "10px",
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
            <Button variant="outlined" sx={{ borderRadius: "10px" }}>
              Regenerate
            </Button>
          </Box>
          <Box sx={{ overflowY: "auto", height: "calc(100vh - 360px)", px: 2 }}>
            <Typography>{selectedFile?.description}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ResultsPage;
