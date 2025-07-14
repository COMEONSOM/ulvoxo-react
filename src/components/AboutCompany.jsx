import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import backgroundAnimation from "../animations/backbackground.json"; // Background animation
import bulletAnimation from "../animations/cute.json"; // Bullet animation
import "./styles/AboutCompany.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
gsap.registerPlugin(ScrollTrigger);

const workAreas = [
  {
    title: "ULVOXO FINANCE",
    link: "https://www.xfactorial.online/",
    desc: [
      ["What it is:", "A comprehensive suite of investor tools—market trackers, portfolio analyzers, risk-assessment calculators, and more."],
      ["Access:", "Completely free, no login."],
      ["Why it exists:", "To remove barriers for amateur and professional investors alike. Whether you’re just starting or fine-tuning a multi-asset portfolio, ULVOXO FINANCE gives you the data and insights you need—at zero cost and with zero ads."],
    ],
  },
  {
    title: "ULVOXO VERSITY",
    link: "https://xfactorialdi.web.app/",
    desc: [
      ["What it is:", "A financial-literacy and investing-education platform for MSMEs and college students."],
      ["Access:", "Free for registered users."],
      ["Why it exists:", "We believe high-quality, in-depth courses shouldn’t break the bank. ULVOXO courses are priced at a nominal fee—just enough to cover our operational costs, with no ads or hidden charges. During Diwali, we offer a one-time special discount to spread awareness and welcome more learners."],
    ],
  },
  {
    title: "ULVOXO SUPERTOOLS",
    link: " https://comeonsom.github.io/Ulvoxo-Supertools/",
    desc: [
      ["What it is:", "The ultimate AI aggregator platform—bringing together every useful AI website and tool you need to automate tasks, analyze data, and innovate."],
      ["Access:", "Through ULVOXO Website or direct."],
      ["Why it exists:", "To save you time hunting for the best AI resources. ULVOXO TOOLS organizes it all in one place."],
    ],
  },
  {
    title: "ULVOXO SUPERTECH",
    link: " https://comeonsom.github.io/Old-Technology.edu/",
    desc: [
      ["What it is:", "R&D for hardware and embedded systems."],
      ["Access:", "Invite-only access."],
      ["Why it exists:", "Innovate with IoT + AI chips."],
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
    text: "Our only revenue comes from ULVOXO INSTITUTE courses, priced competitively against any market alternative, yet boasting more depth and real-world examples.",
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

const growthData = {
  labels: ["2022", "2023", "2024"],
  datasets: [
    {
      label: "Users",
      data: [100, 500, 2000],
      backgroundColor: "#10b981",
    },
  ],
};

function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const isMobile = window.innerWidth < 768;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: "#ffffff" },
        particles: {
          number: {
            value: isMobile ? 25 : 60,
            density: { enable: true, area: 800 },
          },
          move: { enable: true, speed: isMobile ? 1 : 2 },
          size: { value: 3 },
          color: { value: "#10b981" },
        },
        detectRetina: true,
      }}
    />
  );
}

export default function AboutCompany() {
  const sectionRef = useRef(null);
  const workGridRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".work-card");
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

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-company-section">
      <div className="particles-bg">
        <ParticlesBackground />
      </div>

      <motion.p
        className="welcome-message"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to <strong>ULVOXO</strong>, the tech solutions startup dedicated to empowering micro, small, and medium enterprises (MSMEs)—and the next generation of entrepreneurs—with cutting-edge digital tools and financial education. Founded by a passionate team of six, our mission is simple: to make India financially literate and technologically self-sufficient, one MSME at a time.
      </motion.p>

      <motion.h2
        className="about-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Our Different Work Areas
      </motion.h2>

      <div ref={workGridRef} className="work-grid">
        {isDesktop && (
          <div className="work-area-background-animation">
            <Lottie animationData={backgroundAnimation} loop autoplay />
          </div>
        )}

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
            <div>
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
          At <strong>ULVOXO</strong>, we believe that empowering MSMEs with technology and financial know-how can transform India’s economic landscape. Thank you for trusting us on your journey to growth and innovation. We are committed to your success—today, tomorrow, and beyond.
        </div>

        <p className="join-ulvoxo">
          Join us and experience the <strong>ULVOXO</strong> difference!
        </p>
      </motion.div>

      <motion.div
        className="growth-chart"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3>Our Growth</h3>
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <Bar data={growthData} />
        </div>
      </motion.div>
    </section>
  );
}
