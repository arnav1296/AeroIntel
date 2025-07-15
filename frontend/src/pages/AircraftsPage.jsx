import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AircraftsPage = () => {
  const navigate = useNavigate()
  const [aircrafts, setAircrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jets")
      .then((res) => {
        setAircrafts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching aircrafts: ", err);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-dark)] flex items-center justify-center">
        <div className="text-[var(--primary-color)] text-2xl font-bold animate-pulse">
          Loading Aircraft...
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[var(--background-dark)] text-[var(--text-primary)]">
      {/* Header */}
      <Header activeLink="aircraft" />

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-20 flex flex-1 justify-center py-12 md:py-16">
        <div className="flex flex-col w-full max-w-screen-2xl">
          {/* Title Section */}
          <div className="flex flex-wrap justify-between items-center gap-6 p-4 mb-10 md:mb-16 border-b-2 border-[var(--border-color)] pb-8">
            <h1
              className="text-5xl md:text-7xl font-extrabold leading-none tracking-tight text-[var(--text-primary)]"
              style={{
                fontFamily: '"Syne", sans-serif',
                textShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              Military Aircraft
            </h1>
            <div
              className="flex items-center gap-3 text-[var(--text-secondary)] text-lg font-medium"
              style={{ fontFamily: '"Syne", sans-serif' }}
            >
              <svg
                className="text-[var(--primary-color)]"
                fill="currentColor"
                height="28px"
                viewBox="0 0 256 256"
                width="28px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M248,136a8,8,0,0,1-8,8H224v16a8,8,0,0,1-16,0V144H192a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,248,136ZM184,184H40a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16ZM40,88H216a8,8,0,0,1,0,16H40a8,8,0,0,1,0-16Z" />
              </svg>
              <span>{aircrafts.length} Aircraft Available</span>
            </div>
          </div>

          {/* Aircraft Grid */}
          <section className="mb-16 md:mb-24">
            <h2
              className="text-4xl font-bold text-[var(--text-primary)] border-b-2 border-[var(--primary-color)] pb-2 mb-8"
              style={{
                fontFamily: '"Syne", sans-serif',
                textShadow: "0 0 10px var(--accent-glow)",
              }}
            >
              Combat Aircraft Fleet
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {aircrafts.map((aircraft, index) => (
                <div
                  key={aircraft._id}
                  className="aircraft-card group relative overflow-hidden rounded-xl bg-[var(--background-light)] border border-[var(--border-color)] cursor-pointer hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5),0_0_20px_var(--accent-glow)] hover:scale-[1.02] transition-all duration-500"
                  onClick={() => navigate(`/aircrafts/${aircraft.name}`)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <img
                    src={aircraft.imgUrl}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Aircraft Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5 md:p-6">
                    <h3
                      className="text-3xl font-extrabold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-color)] transition-colors duration-300"
                      style={{
                        fontFamily: '"Syne", sans-serif',
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                      }}
                    >
                      {aircraft.name}
                    </h3>

                    <div className="flex items-center text-[var(--text-secondary)] group-hover:text-[var(--primary-color)] transition-colors duration-300">
                      <span
                        className="text-sm font-medium mr-2"
                        style={{ fontFamily: '"Archivo", sans-serif' }}
                      >
                        View Flight Details
                      </span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                      >
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
              className="bg-[var(--primary-color)] text-[var(--background-dark)] font-bold py-3 px-8 rounded-lg hover:bg-[#d9e000] hover:scale-105 hover:-translate-y-1 transition-all duration-300 text-lg"
              style={{
                fontFamily: '"Syne", sans-serif',
                boxShadow: "0 4px 10px rgba(244, 255, 0, 0.2)",
              }}
            >
              Load More Aircraft
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AircraftsPage;
