import { Box } from "@mui/material";
import UploadPage from "./modules/Upload/UploadPage";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80%",
      }}
    >
      <UploadPage />
    </Box>
  );
}

export default App;
