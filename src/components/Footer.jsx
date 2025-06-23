import React from "react";
import "../components/styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© {new Date().getFullYear()} ULVOXO. All rights reserved.</p>
    </footer>
  );
}
