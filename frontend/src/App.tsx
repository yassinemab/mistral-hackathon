import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UploadPDF from "./pages/UploadPDF";
import PDFOverview from "./pages/PDFOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/documents/upload" element={<UploadPDF />} />
        <Route path="/documents" element={<PDFOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
