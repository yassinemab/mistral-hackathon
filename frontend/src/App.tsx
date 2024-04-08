import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MapOverview from "./pages/MapOverview";
import RecordDetailPage from "./pages/RecordDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/map" element={<MapOverview />} />
        <Route path="/document/:id" element={<RecordDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
