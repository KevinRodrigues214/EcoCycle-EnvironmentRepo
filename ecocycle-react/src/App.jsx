import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CommunityHome from "./components/CommunityHome";
import OperationalHome from "./components/OperationalHome";

export default function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

      {/* Auth */}
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

      {/* Dashboards */}
      <Route
        path="/home"
        element={token && user?.role === "user" ? <Home /> : <Navigate to="/" />}
      />
      <Route
        path="/community-home"
        element={
          token && user?.role === "community" && user?.status === "approved"
            ? <CommunityHome />
            : <Navigate to="/" />
        }
      />
      <Route
        path="/operational-home"
        element={token && user?.role === "operational" ? <OperationalHome /> : <Navigate to="/" />}
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
