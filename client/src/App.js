import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./hoc/auth";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/loginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  const NewLandingPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <Routes>
        <Route path="*" element={<NewLandingPage />} />
        <Route path="/login" element={<NewLoginPage />} />
        <Route path="/register" element={<NewRegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
