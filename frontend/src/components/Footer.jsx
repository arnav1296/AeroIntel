import React from 'react'

const Footer = () => {
  return (
    <footer className="text-center p-8 border-t border-[var(--border-color)] mt-auto bg-[var(--background-dark)]">
        <p
          className="text-[var(--text-secondary)] text-base"
          style={{ fontFamily: '"Archivo", sans-serif' }}
        >
          © 2024 AirForceIntel. All rights reserved. Data sourced from public
          domain.
        </p>
        <p className="text-xs text-[var(--text-secondary)]/70 mt-2">
          Designed with inspiration from dynamic web aesthetics.
        </p>
      </footer>
  )
}

export default Footer