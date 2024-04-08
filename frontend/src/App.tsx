import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MapOverview from "./pages/MapOverview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/map" element={<MapOverview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
