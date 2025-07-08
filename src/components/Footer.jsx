import { useEffect, useRef } from "react";
import gsap from "gsap";
import Lottie from "lottie-react";
import "./styles/Footer.css";
import footerAnim from "../animations/footeranimation.json"; // Update with your actual Lottie file path

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { y: 40, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <footer ref={footerRef} className="footer-container">
      <div className="footer-content">
        <p>
          <a href="https://www.xfactorial.online/Other-files/terms.html">Terms and Conditions</a> |{" "}
          <a href="https://www.xfactorial.online/Other-files/founder.html">Founder Details</a>
        </p>
        <p>&copy; {new Date().getFullYear()} ULVOXO. All rights reserved.</p>
      </div>
      <div className="footer-lottie">
        <Lottie animationData={footerAnim} loop={true} />
      </div>
    </footer>
  );
}
