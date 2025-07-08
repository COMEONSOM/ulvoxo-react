// Navbar.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin, CustomEase } from "gsap/all";
import SplitType from "split-type";
import "./styles/Navbar.css";
import Lottie from "lottie-react";
import itemBgAnim from "../animations/navbarcontent.json"; // Use your preferred Lottie background

gsap.registerPlugin(MotionPathPlugin, CustomEase);

const navItems = [
  { label: "Visit Ulvoxo Finance", href: "https://www.xfactorial.online/" },
  { label: "Visit Ulvoxo Institute of Modern Tech", href: "https://xfactorialdi.web.app/" },
  { label: "Visit Ulvoxo SuperTools", href: "https://comeonsom.github.io/X-by-ForLoop.com/" },
  { label: "Visit Ulvoxo Supertech", href: "https://comeonsom.github.io/Old-Technology.edu/" },
];

export default function Navbar() {
  const containerRef = useRef(null);

  useEffect(() => {
    const bands = containerRef.current?.querySelectorAll(".nav-band");
    if (!bands) return;

    containerRef.current.style.perspective = "1000px";

    bands.forEach((band, index) => {
      const label = band.querySelector(".nav-label");
      const split = new SplitType(label, { types: "chars" });

      split.chars.forEach(char => {
        char.style.display = "inline-block";
        char.style.transformOrigin = "center center";
      });

      gsap.fromTo(
        band,
        {
          x: -100,
          y: 80,
          rotateY: -15,
          rotateX: 15,
          opacity: 0,
          scale: 0.9,
          filter: "blur(4px)",
        },
        {
          x: 0,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power4.out",
          delay: index * 0.15,
        }
      );

      gsap.fromTo(
        split.chars,
        {
          y: 40,
          rotateX: 45,
          rotateY: -20,
          opacity: 0,
        },
        {
          y: 0,
          rotateX: 0,
          rotateY: 0,
          opacity: 1,
          ease: "back.out(1.7)",
          duration: 0.6,
          stagger: 0.03,
          delay: 0.3 + index * 0.15,
        }
      );

      gsap.to(band, {
        boxShadow: "0 0 12px rgba(100,150,255,0.2)",
        backgroundColor: "#f0f8ff",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
        delay: 0.4 + index * 0.2,
      });
    });
  }, []);

  const handleRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <nav className="navbar">
      <ul className="nav-container" ref={containerRef}>
        {navItems.map((item, index) => (
          <li
            key={index}
            className="nav-band"
            onClick={() => handleRedirect(item.href)}
            style={{ position: "relative", overflow: "hidden" }}
          >
            {/* Lottie background behind each item */}
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
                opacity: 0.25,
                pointerEvents: "none",
              }}
            />
            <span className="nav-label" style={{ position: "relative", zIndex: 1 }}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
