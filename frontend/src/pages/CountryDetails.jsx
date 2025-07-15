import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CountryDetails = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState(null);
  const [aircrafts, setAircrafts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/countries/name/${countryName}/fighters`)
      .then((res) => {
        setCountry(res.data.country);
        setAircrafts(res.data.activeFighters);
      })
      .catch((err) => {
        console.error("Error fetching country details: ", err);
      });
  }, [countryName]);

  if (!country) {
    return (
      <div className="min-h-screen bg-[var(--background-dark)] flex items-center justify-center">
        <div className="text-[var(--text-primary)] text-2xl">
          Country not found
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[var(--background-dark)] text-[var(--text-primary)]">
      {/* Header */}
      <Header activeLink="countries" />

      {/* Main Content */}
      <main className="px-6 md:px-12 lg:px-20 flex flex-1 justify-center py-12 md:py-16">
        <div className="flex flex-col w-full max-w-screen-2xl">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/countries")}
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors duration-300 cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
              </svg>
              <span
                className="text-lg font-medium"
                style={{ fontFamily: '"Archivo", sans-serif' }}
              >
                Back to Countries
              </span>
            </button>
          </div>

          {/* Country Header */}
          <div className="flex flex-wrap justify-between items-center gap-6 p-6 mb-10 md:mb-16 border-2 border-[var(--border-color)] rounded-xl bg-[var(--background-light)]">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={country.flagUrl}
                  alt={`${country.name} flag`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <h1
                  className="text-4xl md:text-6xl font-extrabold leading-none tracking-tight text-[var(--text-primary)]"
                  style={{
                    fontFamily: '"Syne", sans-serif',
                    textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  {country.name}
                </h1>
                <p
                  className="text-xl text-[var(--text-secondary)] mt-2"
                  style={{ fontFamily: '"Archivo", sans-serif' }}
                >
                  Defense Rank: #{country.defenseRank} | Fleet Size:{" "}
                  {country.fleetSize}
                </p>
              </div>
            </div>
          </div>

          {/* Country Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <div
                className="text-3xl font-bold text-[var(--primary-color)] mb-2"
                style={{ fontFamily: '"Syne", sans-serif' }}
              >
                {country.fighterCount}
              </div>
              <div
                className="text-[var(--text-secondary)] text-sm"
                style={{ fontFamily: '"Archivo", sans-serif' }}
              >
                Fighter Aircraft
              </div>
            </div>

            <div className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <div
                className="text-3xl font-bold text-[var(--primary-color)] mb-2"
                style={{ fontFamily: '"Syne", sans-serif' }}
              >
                {country.fleetSize}
              </div>
              <div
                className="text-[var(--text-secondary)] text-sm"
                style={{ fontFamily: '"Archive", sans-serif' }}
              >
                Total Fleet Size
              </div>
            </div>

            <div className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <div
                className="text-3xl font-bold text-[var(--primary-color)] mb-2"
                style={{ fontFamily: '"Syne", sans-serif' }}
              >
                #{country.defenseRank}
              </div>
              <div
                className="text-[var(--text-secondary)] text-sm"
                style={{ fontFamily: '"Archivo", sans-serif' }}
              >
                Defense Ranking
              </div>
            </div>

            <div className="bg-[var(--background-light)] border border-[var(--border-color)] rounded-xl p-6 text-center">
              <div
                className="text-3xl font-bold text-[var(--primary-color)] mb-2"
                style={{ fontFamily: '"Syne", sans-serif' }}
              >
                {aircrafts.length}
              </div>
              <div
                className="text-[var(--text-secondary)] text-sm"
                style={{ fontFamily: '"Archivo", sans-serif' }}
              >
                Active Fighters
              </div>
            </div>
          </div>

          {/* Fighter Aircraft Section */}
          <section className="mb-16 md:mb-24">
            <h2
              className="text-4xl font-bold text-[var(--text-primary)] border-b-2 border-[var(--primary-color)] pb-2 mb-8"
              style={{
                fontFamily: '"Syne", sans-serif',
                textShadow: "0 0 10px var(--accent-glow)",
              }}
            >
              Active Fighter Aircraft
            </h2>

            {aircrafts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {aircrafts.map((aircraft, index) => (
                  <div
                    key={aircraft._id}
                    className="aircraft-card group relative overflow-hidden rounded-xl bg-[var(--background-light)] border border-[var(--border-color)] cursor-pointer hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5),0_0_20px_var(--accent-glow)] hover:scale-[1.02] transition-all duration-500"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Aircraft Image */}
                    <img
                      src={aircraft.imgUrl}
                      alt={`${aircraft.name}`}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay Content */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5 md:p-6">
                      <h3
                        className="text-3xl font-extrabold text-[var(--text-primary)] mb-2 group-hover:text-[var(--primary-color)] transition-colors duration-300"
                        style={{
                          fontFamily: '"Syne", sans-serif',
                          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                          lineHeight: "1.1",
                        }}
                      >
                        {aircraft.name}
                      </h3>
                      <p
                        className="text-[var(--text-secondary)] text-base"
                        style={{ fontFamily: '"Archivo", sans-serif' }}
                      >
                        {aircraft.manufacturer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)] text-lg">
                  No fighter aircraft data available for this country.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CountryDetails;
