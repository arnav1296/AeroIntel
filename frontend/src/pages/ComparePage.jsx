import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Await } from "react-router-dom";
import Header from "../components/Header";

const ComparePage = () => {
  const [aircraft1, setAircraft1] = useState(null);
  const [aircraft2, setAircraft2] = useState(null);
  const [allAircrafts, setAllAircrafts] = useState([]);
  const [selectedAircraft1, setSelectedAircraft1] = useState("");
  const [selectedAircraft2, setSelectedAircraft2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAircraft = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jets");
        setAllAircrafts(res.data);
      } catch (err) {
        setError("failed to fetch aircraft data");
        console.error("Failed to fetch aircrafts: ", err);
      }
    };

    fetchAircraft();
  }, []);

  const fetchEach = async (aircraftName) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/jets/${aircraftName}`
      );
      return res.data;
    } catch (err) {
      setError("Failed to fetch aircraft details");
      console.error("Error fetching desired aircraft", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAircraft1Change = async (e) => {
    const selectedName = e.target.value;
    setSelectedAircraft1(selectedName);

    if (selectedName) {
      const aircraftData = await fetchEach(selectedName);
      setAircraft1(aircraftData);
    } else {
      setAircraft1(null);
    }
  };

  const handleAircraft2Change = async (e) => {
    const selectedName = e.target.value;
    setSelectedAircraft2(selectedName);

    if (selectedName) {
      const aircraftData = await fetchEach(selectedName);
      setAircraft2(aircraftData);
    } else {
      setAircraft2(null);
    }
  };

  const formatSpec = (value) => {
    return value || "N/A";
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden bg-[var(--background-color)] text-[var(--text-primary)]">
      <div className="layout-container flex h-full grow flex-col">
        <Header activeLink="compare" />
        {/* Main Content */}
        <main className="flex-1 py-12 px-4 md:px-10">
          <div className="layout-content-container flex flex-col w-full max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="mb-12 text-center">
              <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter font-title uppercase">
                Fighter Jet{" "}
                <span className="text-[var(--accent-1)]">Duel</span>
              </h2>
              <p className="text-[var(--text-secondary)] mt-4 text-xl">
                Pick two legends. See who dominates the skies.
              </p>
            </div>

            {/* Aircraft Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="flex flex-col gap-3">
                <label
                  className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider"
                  htmlFor="plane1-select"
                >
                  Jet Alpha
                </label>
                <select
                  className="form-select w-full rounded-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border-2 border-[var(--border-color)] bg-[var(--surface-color)] focus:border-[var(--primary-color)] h-14 px-4 text-lg font-medium"
                  id="plane1-select"
                  value={selectedAircraft1}
                  onChange={handleAircraft1Change}
                >
                  <option value="" disabled>
                    Select First Combatant
                  </option>
                  {allAircrafts.map((aircraft) => (
                    <option key={aircraft._id} value={aircraft.name}>
                      {aircraft.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider"
                  htmlFor="plane2-select"
                >
                  Jet Bravo
                </label>
                <select
                  className="form-select w-full rounded-md text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border-2 border-[var(--border-color)] bg-[var(--surface-color)] focus:border-[var(--primary-color)] h-14 px-4 text-lg font-medium"
                  id="plane2-select"
                  value={selectedAircraft2}
                  onChange={handleAircraft2Change}
                >
                  <option value="" disabled>
                    Select Second Combatant
                  </option>
                  {allAircrafts.map((aircraft) => (
                    <option key={aircraft._id} value={aircraft.name}>
                      {aircraft.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-400 px-4 py-3 rounded mb-8">
                {error}
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
                <p className="mt-2 text-[var(--text-secondary)]">
                  Loading aircraft data...
                </p>
              </div>
            )}

            {/* Aircraft Comparison */}
            {(aircraft1 || aircraft2) && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Aircraft 1 */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  {aircraft1 ? (
                    <>
                      <div
                        className="relative bg-[var(--primary-color)] rounded-lg overflow-hidden"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0% 100%)",
                        }}
                      >
                        <img
                          alt={aircraft1.name}
                          className="w-full h-64 object-cover"
                          src={
                            aircraft1.imgUrl ||
                            "https://via.placeholder.com/600x400?text=No+Image"
                          }
                        />
                        <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full">
                          <h3 className="text-3xl md:text-4xl font-black text-white font-title uppercase">
                            {aircraft1.name}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-[var(--surface-color)] p-6 rounded-lg border border-[var(--border-color)]">
                        <h4 className="text-2xl font-bold mb-4 text-[var(--accent-1)]">
                          Key Specs
                        </h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Type
                            </p>
                            <p className="text-lg font-bold text-[var(--accent-1)]">
                              {formatSpec(aircraft1.type)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Max Speed
                            </p>
                            <p className="text-lg font-bold text-[var(--accent-1)]">
                              {formatSpec(aircraft1.speed)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Range
                            </p>
                            <p className="text-lg font-bold text-[var(--accent-1)]">
                              {formatSpec(aircraft1.range)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Service Year
                            </p>
                            <p className="text- font-bold text-[var(--accent-1)]">
                              {formatSpec(aircraft1.enteredService)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-[var(--surface-color)] rounded-lg border border-[var(--border-color)]">
                      <p className="text-[var(--text-secondary)] text-xl">
                        Select an aircraft to compare
                      </p>
                    </div>
                  )}
                </div>

                {/* VS Section */}
                <div className="lg:col-span-2 flex justify-center items-center py-8 lg:py-0">
                  <span className="text-7xl font-black text-[var(--text-secondary)] font-title">
                    VS
                  </span>
                </div>

                {/* Aircraft 2 */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  {aircraft2 ? (
                    <>
                      <div
                        className="relative rounded-lg overflow-hidden"
                        style={{
                          clipPath:
                            "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
                        }}
                      >
                        <img
                          alt={aircraft2.name}
                          className="w-full h-64 object-cover"
                          src={
                            aircraft2.imgUrl ||
                            "https://via.placeholder.com/600x400?text=No+Image"
                          }
                        />
                        <div className="absolute bottom-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent w-full text-right">
                          <h3 className="text-3xl md:text-4xl font-black text-white font-title uppercase">
                            {aircraft2.name}
                          </h3>
                        </div>
                      </div>
                      <div className="bg-[var(--surface-color)] p-6 rounded-lg border border-[var(--border-color)]">
                        <h4 className="text-2xl font-bold mb-4 text-[var(--accent-2)]">
                          Key Specs
                        </h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Type
                            </p>
                            <p className="text-lg font-bold text-[var(--accent-2)]">
                              {formatSpec(aircraft2.type)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Max Speed
                            </p>
                            <p className="text-lg font-bold text-[var(--accent-2)]">
                              {formatSpec(aircraft2.speed)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Range
                            </p>
                            <p className="text-lg font-bold text-[var(--accent-2)]">
                              {formatSpec(aircraft2.range)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm color-[var(--text-secondary)] uppercase tracking-wider">
                              Service Year
                            </p>
                            <p className="text-lg font-bold text-[var(--accent-2)]">
                              {formatSpec(aircraft2.enteredService)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-[var(--surface-color)] rounded-lg border border-[var(--border-color)]">
                      <p className="text-[var(--text-secondary)] text-xl">
                        Select an aircraft to compare
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Detailed Comparison Table */}
            {aircraft1 && aircraft2 && (
              <div className="mt-16">
                <h3 className="text-4xl font-black font-title mb-8 text-center uppercase">
                  Full Spec{" "}
                  <span className="text-[var(--accent-1)]">Show</span>
                  <span className="text-[var(--accent-2)]">down</span>
                </h3>
                <div className="overflow-x-auto rounded-lg border-2 border-[var(--border-color)] bg-[var(--surface-color)] shadow-2xl">
                  <table className="w-full min-w-[700px]">
                    <thead className="bg-[var(--background-dark)]">
                      <tr>
                        <th className="px-8 py-5 text-left text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)] font-title">
                          Specification
                        </th>
                        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wider font-title">
                          {aircraft1.name}
                        </th>
                        <th className="px-8 py-5 text-center text-sm font-semibold uppercase tracking-wider font-title">
                          {aircraft2.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                      <tr>
                        <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-[var(--text-primary)]">
                          Manufacturer
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-1)]">
                          {formatSpec(aircraft1.manufacturer)}
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-2)]">
                          {formatSpec(aircraft2.manufacturer)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-[var(--text-primary)]">
                          Country
                        </td>
                        <td className="px-8 py-5 text-center text-lg text-[var(--accent-1)]">
                          {formatSpec(aircraft1.jetCountry)}
                        </td>
                        <td className="px-8 py-5 text-center text-lg text-[var(--accent-2)]">
                          {formatSpec(aircraft2.jetCountry)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-[var(--text-primary)]">
                          Type
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-1)]">
                          {formatSpec(aircraft1.type)}
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-2)]">
                          {formatSpec(aircraft2.type)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-[var(--text-primary)]">
                          Max Speed
                        </td>
                        <td className="px-8 py-5 text-center text-lg text-[var(--accent-1)]">
                          {formatSpec(aircraft1.speed)}
                        </td>
                        <td className="px-8 py-5 text-center text-lg text-[var(--accent-2)]">
                          {formatSpec(aircraft2.speed)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-[var(--text-primary)]">
                          Range
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-1)]">
                          {formatSpec(aircraft1.range)}
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-2)]">
                          {formatSpec(aircraft2.range)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-[var(--text-primary)]">
                          Service Entry
                        </td>
                        <td className="px-8 py-5 text-center text-lg text-[var(--accent-1)]">
                          {formatSpec(aircraft1.enteredService)}
                        </td>
                        <td className="px-8 py-5 text-center text-lg text-[var(--accent-2)]">
                          {formatSpec(aircraft2.enteredService)}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-8 py-5 whitespace-nowrap text-lg font-medium text-[var(--text-primary)]">
                          Cost
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-1)]">
                          {formatSpec(aircraft1.cost)}
                        </td>
                        <td className="px-8 py-5 text-center text-lg font-bold text-[var(--accent-2)]">
                          {formatSpec(aircraft2.cost)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {/* Action Button */}
            {aircraft1 && aircraft2 && (
              <div className="mt-16 text-center">
                <button
                  className="btn-primary py-4 px-10 rounded-lg text-xl font-title uppercase shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--accent-glow)] transition-all duration-300"
                  onClick={() =>
                    alert("Winner determination feature coming soon!")
                  }
                >
                  Declare Winner (Feature Coming Soon)
                </button>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--border-color)] py-8 px-6 md:px-10 text-center">
          <p className="text-base text-[var(--text-secondary)]">
            © 2024 AirForce Comparator. Built with React.
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            All jet images are for illustrative purposes only.
          </p>
        </footer>
      </div>
    </div>
  );
};
export default ComparePage;
