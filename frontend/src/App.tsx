import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UploadPDF from "./pages/UploadPDF";
import MapOverview from "./pages/MapOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/documents/upload" element={<UploadPDF />} />
        <Route path="/map" element={<MapOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
