import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AircraftsPage from "./pages/aircraftsPage";
import AircraftDetails from "./pages/AircraftDetails";
import CountryPage from "./pages/CountryPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryDetails from "./pages/CountryDetails";
import ComparePage from "./pages/ComparePage";
import Home from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<CountryPage />} />
        <Route path="/country/:countryName" element={<CountryDetails />} />
        <Route path="/aircrafts" element={<AircraftsPage />} />
        <Route path="/aircrafts/:aircraftName" element={<AircraftDetails />} />
        <Route path="/compare" element={<ComparePage />} />
      </Routes>
    </Router>
  );
}

export default App;
