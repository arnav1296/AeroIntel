import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CountryPage = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/countries")
      .then((res) => {
        setCountries(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching countries: ", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-dark)] flex items-center justify-center">
        <div className="text-[var(--primary-color)] text-2xl font-bold animate-pulse">
          Loading Countries...
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[var(--background-dark)] text-[var(--text-primary)]">
      {/* Header */}
    <Header activeLink = "countries" />

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-20 flex flex-1 justify-center py-12 md:py-16">
        <div className="flex flex-col w-full max-w-screen-2xl">
          {/* Title Section */}
          <div className="flex flex-wrap justify-between items-center gap-6 p-4 mb-10 md:mb-16 border-b-2 border-[var(--border-color)] pb-8">
            <h1 
              className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight text-[var(--text-primary)]"
              style={{ 
                fontFamily: '"Syne", sans-serif',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              Air Force Nations
            </h1>
            <div className="flex items-center gap-3 text-[var(--text-secondary)] text-lg font-medium" style={{ fontFamily: '"Syne", sans-serif' }}>
              <svg className="text-[var(--primary-color)]" fill="currentColor" height="28px" viewBox="0 0 256 256" width="28px" xmlns="http://www.w3.org/2000/svg">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z" />
              </svg>
              <span>{countries.length} Military Nations</span>
            </div>
          </div>

          {/* Countries Grid */}
          <section className="mb-16 md:mb-24">
            <h2 
              className="text-4xl font-bold text-[var(--text-primary)] border-b-2 border-[var(--primary-color)] pb-2 mb-8"
              style={{ 
                fontFamily: '"Syne", sans-serif',
                textShadow: '0 0 10px var(--accent-glow)'
              }}
            >
              Global Air Forces
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {countries.map((country, index) => (
                <div
                  key={country._id}
                  className="country-card group cursor-pointer relative overflow-hidden rounded-xl bg-[var(--background-light)] border border-[var(--border-color)] p-6 hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5),0_0_20px_var(--accent-glow)] hover:scale-[1.03] hover:-translate-y-2 transition-all duration-500"
                  onClick={() => navigate(`/country/${country.name}`)}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-color)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Country Flag Icon */}
                  <div className="flex items-center justify-center w-16 h-16 mb-4 duration-300">
                    <img src={country.flagUrl}></img>
                  </div>

                  {/* Country Info */}
                  <div className="relative z-10">
                    <h3 
                      className="text-3xl font-extrabold text-[var(--text-primary)] mb-3 group-hover:text-[var(--primary-color)] transition-colors duration-300"
                      style={{ 
                        fontFamily: '"Syne", sans-serif',
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                      }}
                    >
                      {country.name}
                    </h3>
                    
                    <div className="flex items-center gap-3 text-[var(--text-secondary)] mb-4">
                      <svg className="w-5 h-5 text-[var(--primary-color)]" fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <path d="M208,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V48A20,20,0,0,0,208,28Zm0,180H48V48H208V208ZM100,84v88a12,12,0,0,1-24,0V84a12,12,0,0,1,24,0Zm56,0v88a12,12,0,0,1-24,0V84a12,12,0,0,1,24,0Z" />
                      </svg>
                      <span className="text-lg font-medium" style={{ fontFamily: '"Archivo", sans-serif' }}>
                        {country.fighterCount} Fighter Aircraft
                      </span>
                    </div>

                    <div className="flex items-center text-[var(--text-secondary)] group-hover:text-[var(--primary-color)] transition-colors duration-300">
                      <span className="text-sm font-medium mr-2" style={{ fontFamily: '"Archivo", sans-serif' }}>
                        Explore Fleet
                      </span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effect Lines */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-color)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </section>

          {/* Load More Button */}
          <div className="text-center my-10">
            <button 
              className="bg-[var(--primary-color)] text-[var(--background-dark)] font-bold py-3 px-8 rounded-lg hover:bg-[#00e68a] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg"
              style={{ 
                fontFamily: '"Syne", sans-serif',
                boxShadow: '0 4px 10px rgba(0, 255, 163, 0.2)'
              }}
            >
              Load More Countries
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center p-8 border-t border-[var(--border-color)] mt-auto bg-[var(--background-dark)]">
        <p className="text-[var(--text-secondary)] text-base" style={{ fontFamily: '"Archivo", sans-serif' }}>
          © 2024 AirForceIntel. All rights reserved. Data sourced from public domain.
        </p>
        <p className="text-xs text-[var(--text-secondary)]/70 mt-2">
          Designed with inspiration from dynamic web aesthetics.
        </p>
      </footer>
    </div>
  );
};

export default CountryPage;
