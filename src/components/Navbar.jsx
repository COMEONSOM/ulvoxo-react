import React from "react";
import "../components/styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">ULVOXO</div>
      <ul className="navbar__links">
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#login">Login</a></li>
      </ul>
    </nav>
  );
}
