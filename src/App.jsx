import UploadPage from "./modules/Upload/UploadPage";
import ResultsPage from "./modules/Results/ResultsPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UploadPage />} />
      <Route path="results" element={<ResultsPage />} />
    </Routes>
  );
}

export default App;
