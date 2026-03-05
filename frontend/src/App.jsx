import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/regiester.jsx";
import Login from "./pages/login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
