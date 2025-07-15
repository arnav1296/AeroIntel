import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AircraftDetails = () => {
  const { aircraftName } = useParams();
  const [aircraft, setAircraft] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/jets/${aircraftName}`)
      .then((res) => {
        setAircraft(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching aircraft", err);
        setIsLoading(false);
      });
  }, [aircraftName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-color)] flex items-center justify-center">
        <div className="text-[var(--primary-color)] text-2xl font-bold animate-pulse">
          Loading Aircraft Details...
        </div>
      </div>
    );
  }

  if (!aircraft) {
    return (
      <div className="min-h-screen bg-[var(--background-color)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Aircraft Not Found
          </h2>
          <button
            onClick={() => navigate("/aircrafts")}
            className="btn-primary py-3 px-6 rounded-lg"
          >
            Back to Aircraft List
          </button>
        </div>
      </div>
    );
  }

  const nameWords = aircraft.name.split(" ");
  const firstHalf = nameWords.slice(0, -1).join(" ");
  const secondHalf = nameWords.slice(-1)[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeLink="aircraft" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="min-h-screen py-16 md:py-24 px-6 md:px-10 lg:px-16 flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-24 items-center w-full max-w-7xl">
            {/* Aircraft Image */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="relative scale-150 aspect-[4/3] lg:aspect-square">
                <img
                  alt={aircraft.name}
                  className="w-full h-full object-cover rounded-xl shadow-2xl transform -rotate-3 hover:rotate-0 hover:scale-110 transition-transform duration-500 ease-out"
                  src={aircraft.imgUrl}
                  style={{
                    filter: "contrast(1.1) saturate(1.2) brightness(0.95)",
                  }}
                />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[var(--primary-color)] rounded-full opacity-50 blur-xl"></div>
              </div>
            </div>

            {/* Aircraft Info */}
            <div className="lg:col-span-3 order-1 lg:order-2 text-left lg:text-right">
              <h1 className="uppercase font-title text-[var(--text-primary)] text-xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight tracking-tighter mb-4">
                <div className="flex flex-col lg:items-end">
                  <span>{firstHalf}</span>
                  <span className="text-[var(--text-accent)] lg:text-right">
                    {secondHalf}
                  </span>
                </div>
              </h1>
              <p className="text-[var(--text-secondary)] text-xl md:text-2xl lg:text-3xl font-medium mb-8 max-w-2xl lg:ml-auto leading-relaxed font-accent tracking-tight">
                {aircraft.type} • {aircraft.manufacturer}
              </p>
              <a
                className="btn-primary py-4 px-8 rounded-lg text-lg inline-block hover:shadow-xl shadow-[0_0_30px_-5px_rgba(244,255,0,0.3)]"
                href="#specifications"
              >
                Explore Specifications
              </a>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section
          className="py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-[var(--surface-color)]"
          id="specifications"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="font-title text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)] mb-12 md:mb-16 text-center lg:text-left relative">
              Key
              <span className="text-[var(--text-accent)] ml-3">
                Specifications
              </span>
              <span className="absolute -bottom-2 left-0 lg:left-auto lg:right-0 h-1.5 w-24 lg:w-32 bg-[var(--primary-color)]"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                { label: "Type", value: aircraft.type, accent: false },
                { label: "Max Speed", value: aircraft.speed, accent: true },
                { label: "Range", value: aircraft.range, accent: false },
                {
                  label: "Manufacturer",
                  value: aircraft.manufacturer,
                  accent: false,
                },
                { label: "Country", value: aircraft.jetCountry, accent: false },
                {
                  label: "Entered Service",
                  value: aircraft.enteredService,
                  accent: true,
                },
                ...(aircraft.cost
                  ? [{ label: "Cost", value: aircraft.cost, accent: false }]
                  : []),
              ].map((spec, index) => (
                <div
                  key={index}
                  className="bg-black p-6 rounded-xl border border-[var(--border-color)] hover:border-[var(--primary-color)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[var(--primary-color)]/20"
                >
                  <p className="text-[var(--text-secondary)] text-sm font-medium uppercase tracking-wider mb-1">
                    {spec.label}
                  </p>
                  <p
                    className={`font-accent text-2xl lg:text-3xl font-bold ${
                      spec.accent
                        ? "text-[var(--text-accent)]"
                        : "text-[var(--text-primary)]"
                    }`}
                  >
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 md:mt-16 text-center">
              <button
                onClick={() => navigate("/aircrafts")}
                className="btn-primary py-4 px-10 rounded-lg text-xl hover:shadow-xl shadow-[0_0_40px_-10px_rgba(244,255,0,0.4)]"
              >
                Back to Aircraft List
              </button>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="px-6 md:px-10 lg:px-16 py-16 md:py-24 bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 md:mb-16">
              <h2 className="font-title text-4xl md:text-5xl text-[var(--text-primary)] mb-6 relative inline-block">
                Overview
                <span className="absolute -bottom-2 left-0 h-1 w-16 bg-[var(--text-accent)]"></span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
                {aircraft.overview ||
                  `The ${aircraft.name} is a ${aircraft.type} developed by ${aircraft.manufacturer} for ${aircraft.jetCountry}. This advanced aircraft entered service in ${aircraft.enteredService} and represents cutting-edge military aviation technology with superior performance characteristics.`}
              </p>
            </div>

            <div>
              <h2 className="font-title text-4xl md:text-5xl text-[var(--text-primary)] mb-6 relative inline-block">
                Technical Details
                <span className="absolute -bottom-2 left-0 h-1 w-20 bg-[var(--text-accent)]"></span>
              </h2>
              <div className="space-y-6">
                <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
                  The {aircraft.name} features advanced avionics and propulsion
                  systems that enable superior performance in its operational
                  role. With a maximum speed of {aircraft.speed} and operational
                  range of {aircraft.range}, this aircraft represents the
                  pinnacle of {aircraft.manufacturer}'s engineering
                  capabilities.
                </p>
                <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
                  Since entering service in {aircraft.enteredService}, the{" "}
                  {aircraft.name} has proven to be a reliable and effective
                  platform for {aircraft.jetCountry}'s defense forces. Its
                  sophisticated design and advanced capabilities make it a
                  formidable asset in modern military operations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border-color)] bg-[var(--surface-color)] py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="size-6 text-[var(--primary-color)]">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_6_319_footer)">
                  <path
                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_6_319_footer">
                    <rect fill="white" height="48" width="48" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)] font-accent">
              AirForceHub
            </p>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            © 2024 AirForceHub. All rights reserved. Data sourced from public
            domain and subject to change.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <span className="text-[var(--text-secondary)]">|</span>
            <a
              className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] text-sm transition-colors"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AircraftDetails;
