import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import AssignmentPage from "./pages/Assignments";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assignments" element={<AssignmentPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
