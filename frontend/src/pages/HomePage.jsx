import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WorldMap from "../components/WorldMap";

const Home = () => {
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Statistics data for the hero section
  const stats = [
    { number: "195", label: "Countries Tracked", icon: "🌍" },
    { number: "2,500+", label: "Fighter Aircraft", icon: "✈️" },
    { number: "150+", label: "Aircraft Types", icon: "🛩️" },
    { number: "Real-time", label: "Data Updates", icon: "📡" },
  ];

  // Featured countries data
  const featuredCountries = [
    { name: "United States", flag: "🇺🇸", rank: "#1", fighters: "2,085" },
    { name: "Russia", flag: "🇷🇺", rank: "#2", fighters: "1,531" },
    { name: "China", flag: "🇨🇳", rank: "#3", fighters: "1,200" },
    { name: "India", flag: "🇮🇳", rank: "#4", fighters: "538" },
  ];



  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[var(--background-dark)] text-[var(--text-primary)]">
      {/* Header */}
      <Header activeLink="home" />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/20 via-transparent to-[var(--accent-color)]/20"></div>
        <div className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24">
          <div className="max-w-screen-2xl mx-auto text-center">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-6"
              style={{
                fontFamily: '"Syne", sans-serif',
                background:
                  "linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0 0 30px var(--accent-glow)",
              }}
            >
              Aero Intel
            </h1>
            <p
              className="text-2xl md:text-3xl text-[var(--text-secondary)] mb-8 max-w-4xl mx-auto"
              style={{ fontFamily: '"Archivo", sans-serif' }}
            >
              Explore the world's military aviation capabilities through an
              interactive map
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-full px-6 py-3">
                <span className="text-[var(--primary-color)] font-semibold">
                  Real-time Data
                </span>
              </div>
              <div className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-full px-6 py-3">
                <span className="text-[var(--primary-color)] font-semibold">
                  Interactive Map
                </span>
              </div>
              <div className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-full px-6 py-3">
                <span className="text-[var(--primary-color)] font-semibold">
                  Comprehensive Analysis
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-xl p-6 text-center hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3),0_0_20px_var(--accent-glow)] hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div
                  className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-2"
                  style={{ fontFamily: '"Syne", sans-serif' }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-[var(--text-secondary)] text-sm md:text-base"
                  style={{ fontFamily: '"Archivo", sans-serif' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Countries Section */}
      <section className="px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
              style={{
                fontFamily: '"Syne", sans-serif',
                textShadow: "0 0 20px var(--accent-glow)",
              }}
            >
          <div className=''>
            <WorldMap />
          </div>
              Top Military Powers
            </h2>
            <p
              className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto"
              style={{ fontFamily: '"Archivo", sans-serif' }}
            >
              Explore the leading nations in military aviation technology and
              capabilities
            </p>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCountries.map((country, index) => (
              <div
                key={index}
                onClick={() => handleCountryClick(country.name)}
                className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-xl p-6 text-center cursor-pointer hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3),0_0_20px_var(--accent-glow)] hover:scale-105 transition-all duration-500 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {country.flag}
                </div>
                <h3
                  className="text-2xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-color)] transition-colors duration-300"
                  style={{ fontFamily: '"Syne", sans-serif' }}
                >
                  {country.name}
                </h3>
                <div className="flex justify-between items-center text-[var(--text-secondary)] text-sm">
                  <span>Rank: {country.rank}</span>
                  <span>Fighters: {country.fighters}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="max-w-screen-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[var(--primary-color)]/20 via-[var(--accent-color)]/20 to-[var(--primary-color)]/20 border border-[var(--border-color)] rounded-2xl p-12 md:p-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6"
              style={{
                fontFamily: '"Syne", sans-serif',
                textShadow: "0 0 20px var(--accent-glow)",
              }}
            >
              Ready to Explore?
            </h2>
            <p
              className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: '"Archivo", sans-serif' }}
            >
              Dive deep into the world of military aviation. Discover aircraft
              specifications, compare national capabilities, and stay updated
              with the latest defense technologies.
            </p>
            <button
              onClick={() => navigate("/countries")}
              className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-5px_var(--primary-color)]"
              style={{ fontFamily: '"Archivo", sans-serif' }}
            >
              View All Countries
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
