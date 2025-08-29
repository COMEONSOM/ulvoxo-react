// Navbar.jsx
// -------------------------------------------
// A reusable, dev-friendly Navbar component
// - No GSAP animations on first load (clean static look)
// - Lottie animation runs in background for styling
// - Each nav item redirects to external links
// -------------------------------------------

import { useRef } from "react";
import Lottie from "lottie-react";
import itemBgAnim from "../animations/navbarcontent.json"; // Background animation
import "./styles/Navbar.css"; // Navbar specific styles

// ✅ Navigation items list (easy to update in future)
const navItems = [
  { label: " Ulvoxo Finance", href: "https://www.xfactorial.online/" },
  { label: " Ulvoxo Versity", href: "https://xfactorialdi.web.app/" },
  { label: " Ulvoxo SuperTools", href: "https://comeonsom.github.io/Ulvoxo-Supertools/" },
  { label: " Ulvoxo Updates", href: "https://comeonsom.github.io/Ulvoxo-Update/" },
];

export default function Navbar() {
  // Reference for the nav container (if we want to add scroll/animations later)
  const containerRef = useRef(null);

  // Function to safely redirect user to external links in a new tab
  const handleRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <nav className="navbar">
      {/* Main container for nav items */}
      <ul className="nav-container" ref={containerRef}>
        {navItems.map((item, index) => (
          <li
            key={index}
            className="nav-band"
            onClick={() => handleRedirect(item.href)}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* 🔹 Lottie animation as background for each nav item */}
            <Lottie
              animationData={itemBgAnim}
              loop
              autoplay
              style={{
                position: "absolute",
                top: "-20%",
                left: "-20%",
                width: "140%",
                height: "140%",
                zIndex: 0,
                opacity: 0.25, // Keep subtle so text is readable
                pointerEvents: "none", // Prevent blocking clicks
              }}
            />

            {/* 🔹 Navigation Label (clickable text) */}
            <span className="nav-label">
              {item.label} <span className="nav-arrow">→</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* 
-------------------------------------------
🔹 File Structure & Usage Notes
-------------------------------------------
1. navItems[]:
   - Holds all the navigation options.
   - To add a new link, just append a new object:
     { label: "My New Page", href: "https://example.com" }

2. Lottie animation:
   - Each nav item has a Lottie background animation.
   - Controlled via itemBgAnim (JSON file).
   - Non-blocking: zIndex + pointerEvents ensure the label stays usable.

3. Styles:
   - Navbar.css contains reusable styling (padding, hover effects, font-size).
   - Inline styles are minimal (used for positioning only).

4. Future friendly:
   - Easy to add/remove items.
   - Easy to replace Lottie animation (just swap JSON).
   - If animations (like GSAP) are needed later, can be reintroduced 
     inside `useEffect`.
*/
