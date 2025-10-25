// ============================================================
//  NAVBAR COMPONENT — MODERN, CLEAN, PRODUCTION-READY
// ============================================================
//  FEATURES:
//   • SHOWS "RELEASED SOFTWARES" SECTION WITH RELEVANT ICONS
//   • SECURE ASYNC REDIRECTION WITH ERROR HANDLING
//   • STATIC DATA STRUCTURE (O(1) LOOKUP)
//   • LIGHTWEIGHT, MINIMAL DEPENDENCIES
// ============================================================

import React from "react";
import "./styles/Navbar.css";

// ============================================================
// 🔹 ASYNC REDIRECT FUNCTION — SECURE AND ROBUST
// ============================================================
const redirectTo = async (url) => {
  try {
    if (!url || typeof url !== "string") throw new Error("INVALID URL PROVIDED");
    await new Promise((resolve) => setTimeout(resolve, 60));
    window.open(url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("REDIRECTION FAILED:", error.message);
    alert("⚠️ Failed to open link. Please try again later.");
  }
};

// ============================================================
// 🔹 ICON COMPONENTS — MATCH SOFTWARE PURPOSE VISUALLY
// ============================================================
const Icons = {
  stockAveraging: (
    // 📊 STOCK GRAPH ICON
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M3 3v18h18v-2H5V3H3Zm4 10 3-4 4 5 4-6 3 5v4H7v-4Z" />
    </svg>
  ),
  sipAnalyzer: (
    // 💹 SIP RETURN GRAPH ICON
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M3 3v18h18v-2H5V3H3Zm2 10 4 4 6-7 4 5 3-2-6-7-6 7-3-3-2 3Z" />
    </svg>
  ),
  goldJewel: (
    // 💎 GOLD JEWEL ICON
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M12 2 2 9l10 13 10-13Zm0 2.69 6.93 4.68L12 20.1 5.07 9.37Z" />
    </svg>
  ),
  creditEmi: (
    // 💳 CREDIT CARD ICON
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4v2h18V8Zm0 6v2h10v-2Z" />
    </svg>
  ),
  travelExpense: (
    // ✈️ TRAVEL ICON
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M2.5 19 21 12 2.5 5v5l10 2-10 2v5Z" />
    </svg>
  ),
  helpingHand: (
    // 🤝 HELPING HAND ICON (HANDSHAKE)
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="30" height="30">
      <path d="M3 11v-1.5a1 1 0 0 1 1-1h2.4l2.1 2h1.7L13 8h2l1.9 2h2.1a1 1 0 0 1 1 1v1.5l-2.2 2.2a1 1 0 0 1-1.4 0l-.8-.8-1.2 1.2a1 1 0 0 1-1.4 0l-.9-.9-1.2 1.2a1 1 0 0 1-1.4 0L8 13.8l-2.2 2.2a1 1 0 0 1-1.4 0L3 13.5V11Zm12.3-4.2L13 8l-1.8 1.8H9l-2-2H4V9l2 2h1.4l1.6 1.6 1.2-1.2h1.4l1.2 1.2 1.2-1.2h1.3l1.2 1.2 1.6-1.6H20l2-2V7h-3l-2-2h-1.7Z" />
    </svg>
  ),
};

// ============================================================
// 🔹 SOFTWARE DATA (STATIC O(1) STRUCTURE)
// ============================================================
const releasedSoftwares = Object.freeze([
  {
    name: "Stock Averaging",
    href: "https://comeonsom.github.io/stock-averaging/",
    icon: Icons.stockAveraging,
  },
  {
    name: "SIP Return Analyzer",
    href: "https://comeonsom.github.io/investment-analyzer/",
    icon: Icons.sipAnalyzer,
  },
  {
    name: "Gold Jewel Price Indicator",
    href: "https://comeonsom.github.io/Gold-Jewellery-Price-Calculator/",
    icon: Icons.goldJewel,
  },
  {
    name: "Credit Card EMI Calculator",
    href: "https://comeonsom.github.io/Credit-Card-EMI-Calculator/",
    icon: Icons.creditEmi,
  },
  {
    name: "Travel Expense Manager",
    href: "https://distribution-of-funds.onrender.com/",
    icon: Icons.travelExpense,
  },
  {
    name: "Helping Hand",
    href: "https://comeonsom.github.io/Ulvoxo-Update/",
    icon: Icons.helpingHand,
  },
]);

// ============================================================
// 🔹 MAIN NAVBAR COMPONENT
// ============================================================
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* SECTION TITLE */}
        <h2 className="navbar-title">Released Softwares</h2>

        {/* SOFTWARE BUTTONS GRID */}
        <div className="released-softwares">
          {releasedSoftwares.map((app, index) => (
            <button
              key={app.name || index}
              className="software-btn"
              onClick={() => redirectTo(app.href)}
              aria-label={`Open ${app.name}`}
            >
              <div className="software-icon">{app.icon}</div>
              <span className="software-name">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// ⚙️ PERFORMANCE NOTES:
//  • STATIC STRUCTURE → O(1) ACCESS
//  • RENDER COMPLEXITY → O(N) WHERE N = SOFTWARE COUNT
//  • NON-BLOCKING ASYNC REDIRECT
//  • SECURE TAB OPENING (NOOPENER + NOREFERRER)
//  • HANDSHAKE ICON FOR “HELPING HAND” FOR VISUAL ACCURACY
// ============================================================
