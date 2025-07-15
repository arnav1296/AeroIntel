import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CountryPage from "./pages/CountryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";
import Home from "./pages/HomePage";
import AircraftsPage from "./pages/AircraftsPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<CountryPage />} />
        <Route path="/country/:countryName" element={<CountryDetails />} />
        <Route path="/aircrafts" element={<AircraftsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
