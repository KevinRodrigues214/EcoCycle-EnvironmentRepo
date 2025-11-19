import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CommunityHome from "./components/CommunityHome";
import OperationalHome from "./components/OperationalHome";

// NEW: user pages
import ChallengesPage from "./components/ChallengesPage";
import EventsPage from "./components/EventsPage";
import RewardsPage from "./components/RewardsPage";
import RecyclingMapPage from "./components/RecyclingMapPage";
import PhotoAIPage from "./components/PhotoAIPage";
import PickupRequestsPage from "./components/PickupRequestsPage";

export default function App() {
  const token = localStorage.getItem("token");

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  return (
    <Routes>
      {/* Root */}
      <Route
        path="/"
        element={token ? <Home /> : <Navigate to="/login" />}
      />

      {/* Auth */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/" />}
      />

      {/* User dashboard + user pages */}
      <Route
        path="/home"
        element={
          token && user?.role === "user" ? <Home /> : <Navigate to="/" />
        }
      />
      <Route
        path="/challenges"
        element={
          token && user?.role === "user" ? (
            <ChallengesPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/events"
        element={
          token && user?.role === "user" ? (
            <EventsPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/rewards"
        element={
          token && user?.role === "user" ? (
            <RewardsPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/recycling-map"
        element={
          token && user?.role === "user" ? (
            <RecyclingMapPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/photo-ai"
        element={
          token && user?.role === "user" ? (
            <PhotoAIPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/pickup-requests"
        element={
          token && user?.role === "user" ? (
            <PickupRequestsPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Community dashboard */}
      <Route
        path="/community-home"
        element={
          token &&
            user?.role === "community" &&
            user?.status === "active" ? (
            <CommunityHome />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Operational dashboard */}
      <Route
        path="/operational-home"
        element={
          token && user?.role === "operational" ? (
            <OperationalHome />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
