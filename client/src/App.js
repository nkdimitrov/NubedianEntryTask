import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./pages/Add.jsx";
import CPUs from "./pages/CPUs.jsx";
import Update from "./pages/Update.jsx";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CPUs />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;