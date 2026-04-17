import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import VideoMeet from "./pages/videoMeet.jsx";
// import Dashboard from "./pages/Dashboard"; // create this
// import PrivateRoute from "./components/PrivateRoute";

import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path='/:url' element={<VideoMeet/>}/>
          {/* Protected Route */}
          {/* <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;