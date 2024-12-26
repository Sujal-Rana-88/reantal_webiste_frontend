import React from "react";
import "./App.css";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import NotFound from "./components/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Pages/HomePage/Home";
import MyAccount from "./Pages/MyAccount/MyAccount";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import UnauthorizedHome from "./Pages/Unauthorized/UnauthorizedHome";
import Services from "./Pages/Services/Services";
import RentGame from "./Pages/RentGame/RentGame";
import Profile from "./Pages/Profile/Profile";

const isAuthenticated = () => {
  // Check if the user is authenticated
  return JSON.parse(localStorage.getItem('isAuthenticated')) === true; 
};

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated() ? <Navigate to="/home" /> : <UnauthorizedHome />} 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protect the Home route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
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
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
