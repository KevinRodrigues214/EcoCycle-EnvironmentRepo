import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";


export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

      {/* Login */}
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />

      {/* Register */}
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
