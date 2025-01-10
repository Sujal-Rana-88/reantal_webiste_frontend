import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import NotFound from "./components/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Pages/HomePage/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import UnauthorizedHome from "./Pages/Unauthorized/UnauthorizedHome";
import Services from "./Pages/Services/Services";
import RentGame from "./Pages/RentGame/RentGame";
import LendGameHistory from "./Pages/LendGamesHistory/LendGameHistory";
import VerifyEmail from "./components/auth/VerifyEmail";
import MoreGames from "./Pages/MoreGames/MoreGames";
import MyAccount from "./Pages/Profile/MyAccount";
import OAuthRegsiterScreen from "./components/auth/OAuthRegsiterScreen";

const isAuthenticated = () => {
  return JSON.parse(localStorage.getItem("isAuthenticated")) === true;
};

function App() {
  const redirectToRegister =
    localStorage.getItem("redirectToRegister") === "true";

  return (
    <Routes>
      {/* Handle OAuth redirection */}
      {redirectToRegister && (
        <Route path="/auth/google/register" element={<OAuthRegsiterScreen />} />
      )}

      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/home" /> : <UnauthorizedHome />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verifyEmail" element={<VerifyEmail />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/LendGameHistory"
        element={
          <ProtectedRoute>
            <LendGameHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <ContactUs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rentgame"
        element={
          <ProtectedRoute>
            <RentGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/myaccount"
        element={
          <ProtectedRoute>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/more"
        element={
          <ProtectedRoute>
            <MoreGames />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
