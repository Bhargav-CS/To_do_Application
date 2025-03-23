import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("auth_token") || null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={(token) => { setToken(token); }} />} />
        <Route path="/signup" element={<Signup onSignup={() => { window.location.href = "/login"; }} />} />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
