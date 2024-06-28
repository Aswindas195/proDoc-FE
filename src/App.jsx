import UploadPage from "./modules/Upload/UploadPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
    </Routes>
  );
}

export default App;
