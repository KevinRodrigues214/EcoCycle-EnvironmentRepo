
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import CommunityHome from "./components/CommunityHome";
import OperationalHome from "./components/OperationalHome";

import ChallengesPage from "./components/ChallengesPage";
import EventsPage from "./components/EventsPage";
import RewardsPage from "./components/RewardsPage";
import RecyclingMapPage from "./components/RecyclingMapPage";
import PhotoAIPage from "./components/PhotoAIPage";
import PickupRequestsPage from "./components/PickupRequestsPage";

import ProtectedRoute from "./ProtectedRoute";


export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

 
  const syncAuthState = () => {
    setToken(localStorage.getItem("token"));
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    
    const onStorage = (e) => {
      if (e.key === "token" || e.key === "user") {
        syncAuthState();
      }
    };

    
    const onAuthChanged = () => syncAuthState();

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />

      {/* Auth */}
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/" />}
      />

      {/* User dashboard + user pages (usando ProtectedRoute) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute token={token}>
            {user?.role === "user" ? <Home /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/challenges"
        element={
          <ProtectedRoute token={token}>
            {user?.role === "user" ? <ChallengesPage /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute token={token}>
            {user?.role === "user" ? <EventsPage /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/rewards"
        element={
          <ProtectedRoute token={token}>
            {user?.role === "user" ? <RewardsPage /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/recycling-map"
        element={
          <ProtectedRoute token={token}>
            {user?.role === "user" ? <RecyclingMapPage /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/photo-ai"
        element={
          <ProtectedRoute token={token}>
            {user?.role === "user" ? <PhotoAIPage /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/pickup-requests"
        element={
          <ProtectedRoute token={token}>
            {user?.role === "user" ? <PickupRequestsPage /> : <Navigate to="/" />}
          </ProtectedRoute>
        }
      />

      {/* Community dashboard */}
      <Route
        path="/community-home"
        element={
          <ProtectedRoute token={token}>
            {token && user?.role === "community" && user?.status === "active" ? (
              <CommunityHome />
            ) : (
              <Navigate to="/" />
            )}
          </ProtectedRoute>
        }
      />

      {/* Operational dashboard */}
      <Route
        path="/operational-home"
        element={
          <ProtectedRoute token={token}>
            {token && user?.role === "operational" ? (
              <OperationalHome />
            ) : (
              <Navigate to="/" />
            )}
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
