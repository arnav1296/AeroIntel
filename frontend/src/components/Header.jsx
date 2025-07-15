import React from "react";

const Header = ({ activeLink = "home" }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--border-color)] px-6 md:px-10 py-5 shadow-lg bg-[var(--background-dark)] sticky top-0 z-50">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 text-[var(--primary-color)]">
          <div className="size-8">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <h1 className="text-[var(--text-primary)] text-2xl font-bold tracking-tight" style={{ fontFamily: '"Syne", sans-serif' }}>
            AeroIntel
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          <a 
            className={`nav-link text-base leading-normal transition-colors duration-200 ${
              activeLink === "home" 
                ? "text-[var(--primary-color)] relative" 
                : "text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
            }`}
            href="/"
            style={activeLink === "home" ? { fontFamily: '"Syne", sans-serif', fontWeight: 700 } : {}}
          >
            Home
            {activeLink === "home" && (
              <div className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-[var(--primary-color)]" style={{ boxShadow: '0 0 8px var(--accent-glow)' }} />
            )}
          </a>
          <a 
            className={`nav-link text-base leading-normal transition-colors duration-200 ${
              activeLink === "countries" 
                ? "text-[var(--primary-color)] relative" 
                : "text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
            }`}
            href="/countries"
            style={activeLink === "countries" ? { fontFamily: '"Syne", sans-serif', fontWeight: 700 } : {}}
          >
            Countries
            {activeLink === "countries" && (
              <div className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-[var(--primary-color)]" style={{ boxShadow: '0 0 8px var(--accent-glow)' }} />
            )}
          </a>
          <a 
            className={`nav-link text-base leading-normal transition-colors duration-200 ${
              activeLink === "aircraft" 
                ? "text-[var(--primary-color)] relative" 
                : "text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
            }`}
            href="#"
            style={activeLink === "aircraft" ? { fontFamily: '"Syne", sans-serif', fontWeight: 700 } : {}}
          >
            Aircraft
            {activeLink === "aircraft" && (
              <div className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-[var(--primary-color)]" style={{ boxShadow: '0 0 8px var(--accent-glow)' }} />
            )}
          </a>
          <a 
            className={`nav-link text-base leading-normal transition-colors duration-200 ${
              activeLink === "compare" 
                ? "text-[var(--primary-color)] relative" 
                : "text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
            }`}
            href="/compare"
            style={activeLink === "compare" ? { fontFamily: '"Syne", sans-serif', fontWeight: 700 } : {}}
          >
            Compare
            {activeLink === "compare" && (
              <div className="absolute left-0 bottom-[-6px] w-full h-[2px] bg-[var(--primary-color)]" style={{ boxShadow: '0 0 8px var(--accent-glow)' }} />
            )}
          </a>
        </nav>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4 md:gap-6">
        <label className="relative flex items-center min-w-40 md:min-w-56 h-11 max-w-xs">
          <div className="text-[var(--text-secondary)] absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center pl-3.5">
            <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
              <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
            </svg>
          </div>
          <input
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-sm font-normal leading-normal placeholder:text-[var(--text-secondary)] px-3 pl-10 h-full bg-[var(--secondary-color)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(0,255,163,0.3)] transition-all duration-300"
            placeholder="Search countries..."
          />
        </label>
      </div>
    </header>
  );
};

export default Header;