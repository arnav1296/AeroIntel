import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const WorldMap = () => {
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries: ", error);
      });
  }, []);

  const countryStyle = (feature) => ({
    weight: 0.1,
    opacity: 1,
    fillColor: hoveredCountry == feature.properties.name ? "#00ffa3" : "",
    fillOpacity: hoveredCountry == feature.properties.name ? 0.7 : 0,
  });

  const onCountryHover = (e) => {
    const countryName = e.target.feature.properties.name;
    setHoveredCountry(countryName);
  };

  const onCountryLeave = (e) => {
    const countryName = e.target.feature.properties.name;
    setHoveredCountry(null);
  };

  const onCountryClick = (e) => {
    const countryName = e.target.feature.properties.name;

    // Convert country name to URL-friendly format
    const countrySlug = countryName.toLowerCase().replace(/\s+/g, "-");

    // Navigate to country-specific page
    navigate(`/country/${countrySlug}`);
  };

  const onEachCountry = (feature, layer) => {
    layer.on({
      click: onCountryClick,
      mouseover: onCountryHover,
      mouseout: onCountryLeave,
    });

    // Add a simple tooltip showing country name
    layer.bindTooltip(feature.properties.name, {
      permanent: false,
      sticky: true,
      offset: [0, -5],
    });
  };

  const worldBounds = [
    [-85, -180], // Southwest corner
    [85, 180]    // Northeast corner
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mb-12 bg-[var(--background-light)] border border-[var(--border-color)] rounded-xl overflow-hidden z-0">
      <div className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">Click Any Country</h1>
        <p className="text-gray-600 mt-2">
          Click on any country to go to its dedicated page
        </p>
      </div>

      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ height: "500px", width: "100%" }}
        scrollWheelZoom={true}
        worldCopyJump={false}
        maxBounds={worldBounds}
        minZoom={2}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {countries && (
          <GeoJSON
            data={countries}
            style={countryStyle}
            onEachFeature={onEachCountry}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default WorldMap;
