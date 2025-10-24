// ============================================================
// ABOUTCOMPANY COMPONENT (2026 READY, DEV-FRIENDLY)
// ORIGINAL CONTENT KEPT, STRUCTURE + PERFORMANCE IMPROVED
// EXTRA CHANGE: "NEW" BADGE REPLACED WITH LOTTIE ANIMATION
// ============================================================

import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";

import backgroundAnimation from "../animations/background.json"; // Background animation
import bulletAnimation from "../animations/bulletpoints.json"; // Bullet animation
import newTagAnimation from "../animations/newtaganimation.json"; // "NEW" Tag animation (top-right of card)

import "./styles/AboutCompany.css";
import GrowthChart from "./chunks/GrowthChart"; // Extracted Growth Chart Component

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// ============================================================
// STATIC DATA (WORK AREAS + HIGHLIGHTS)
// ============================================================
const workAreas = [
  {
    title: "ULVOXO FINANCE",
    link: "https://www.xfactorial.online/",
    desc: [
      [
        "What it is:",
        "A comprehensive suite of investor tools—market trackers, portfolio analyzers, risk-assessment calculators, and more.",
      ],
      ["Access:", "No ads! Login required to access some tools."],
      [
        "Why it exists:",
        "To remove barriers for amateur and professional investors alike. Whether you’re just starting or fine-tuning a multi-asset portfolio, ULVOXO FINANCE gives you the data and insights you need—at zero cost and with zero ads.",
      ],
    ],
  },
  {
    title: "Openroot Classes",
    link: "https://openroot-classes.web.app/",
    desc: [
      [
        "What it is:",
        "A financial-literacy and investing-education platform for MSMEs and college students.",
      ],
      ["Access:", "No ads! Visit to know more!"],
      [
        "Why it exists:",
        "We believe high-quality, in-depth courses shouldn’t break the bank. ULVOXO courses are priced at a nominal fee—just enough to cover our operational costs, with no ads or hidden charges. During Diwali, we offer a one-time special discount to spread awareness and welcome more learners.",
      ],
    ],
  },
  {
    title: "ULVOXO SUPERTOOLS",
    link: " https://comeonsom.github.io/Ulvoxo-Supertools/",
    desc: [
      [
        "What it is:",
        "The ultimate AI aggregator platform—bringing together every useful AI websites you need.",
      ],
      ["Access:", "Completely free no ads!"],
      [
        "Why it exists:",
        "To save you time hunting for the best AI resources. ULVOXO TOOLS organizes it all in one place.",
      ],
    ],
  },
  {
    title: "Helping Hand",
    link: "https://comeonsom.github.io/Ulvoxo-Update/",
    desc: [
      ["What it is:", "Important websites and job updates for ITI, Diploma, UG/PG students."],
      ["Access:", "Completely free no ads!"],
      [
        "Why it exists:",
        "It is a single place for ITI, Diploma, and UG/PG students to find useful websites, study materials, and government job updates. It’s completely free, has no ads. Just follow Ulvoxo—nothing else needed.",
      ],
    ],
  },
];

const highlights = [
  {
    label: "User-First Philosophy:",
    text: "No ads, no gimmicks—ever. We grow alongside our users, reinvesting every rupee back into improving our platforms.",
  },
  {
    label: "Transparent Pricing:",
    text: "Our only revenue comes from ULVOXO VERSITY courses, priced competitively against any market alternative, yet boasting more depth and real-world examples.",
  },
  {
    label: "Small Team, Big Impact:",
    text: "Even with just six team members today, we’ve supported our first two customers from day one—and we remain as committed now as we were then.",
  },
  {
    label: "Community Engagement:",
    text: "Once a year—during Diwali—we run a special promotion to welcome new learners and spread the word. Outside of that, our promise is consistent value without sales-driven distractions.",
  },
];

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function AboutCompany() {
  const sectionRef = useRef(null);
  const workGridRef = useRef(null);

  // Responsive state (desktop vs mobile)
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 768);

  // Handle window resize with throttling
  useEffect(() => {
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 768);
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP animations for headings + cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".work-card");

      // Animate each card on scroll
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Animate heading
      gsap.from(".about-heading", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
        },
      });
    }, workGridRef);

    return () => ctx.revert();
  }, []);

  // ============================================================
  // JSX Render
  // ============================================================
  return (
    <section ref={sectionRef} className="about-company-section">
      {/* WELCOME MESSAGE */}
      <motion.p
        className="welcome-message"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to <strong>ULVOXO</strong>, the tech solutions startup dedicated
        to empowering micro, small, and medium enterprises (MSMEs)—and the next
        generation of entrepreneurs—with cutting-edge digital tools and
        financial education. Founded by a passionate team of six, our mission is
        simple: to make India financially literate and technologically
        self-sufficient, one MSME at a time.
      </motion.p>

      {/* SECTION HEADING */}
      <motion.h2
        className="about-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Our Different Work Areas
      </motion.h2>

      {/* WORK AREAS GRID */}
      <div ref={workGridRef} className="work-grid">
        {/* Background animation only for desktop */}
        {isDesktop && (
          <div className="work-area-background-animation">
            <Lottie animationData={backgroundAnimation} loop autoplay />
          </div>
        )}

        {/* Dynamically render all work areas */}
        {workAreas.map(({ title, desc, link }, index) => (
          <motion.a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="work-card"
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ type: "spring", stiffness: 280 }}
          >
            <div className="relative">
              {/* NEW TAG LOTTIE ANIMATION */}
              {title === "ULVOXO UPDATES" && (
                <div className="new-badge-animation">
                  <Lottie
                    animationData={newTagAnimation}
                    loop
                    autoplay
                    style={{
                      width: 60,
                      height: 60,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  />
                </div>
              )}

              {/* CARD CONTENT */}
              <h3>{title}</h3>
              {desc.map(([label, val], i) => (
                <p key={i}>
                  <strong>{label}</strong> {val}
                </p>
              ))}
              <p className="cta">→ Click to learn more</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* WHY ULVOXO SECTION */}
      <motion.div
        className="why-ulvoxo"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2>Why ULVOXO Stands Out</h2>
        <div>
          {highlights.map((point, i) => (
            <motion.div
              key={i}
              className="highlight-point"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Bullet Lottie animation */}
              <div className="bullet-animation">
                <Lottie animationData={bulletAnimation} loop autoplay />
              </div>
              <p>
                <strong>{point.label}</strong> {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="why-ulvoxo-final">
          At <strong>ULVOXO</strong>, we believe that empowering MSMEs with
          technology and financial know-how can transform India’s economic
          landscape. Thank you for trusting us on your journey to growth and
          innovation. We are committed to your success—today, tomorrow, and
          beyond.
        </div>

        <p className="join-ulvoxo">
          Join us and experience the <strong>ULVOXO</strong> difference!
        </p>
      </motion.div>

      {/* GROWTH CHART SECTION */}
      <GrowthChart />
    </section>
  );
}
