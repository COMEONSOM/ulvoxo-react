// Elements.jsx
import { useEffect, useRef } from "react";
import "./styles/Elements.css";
import Lottie from "lottie-react";
import continueAnimation from "../animations/continuebutton.json";

export default function Elements() {
  const newTagRef2 = useRef(null);

  useEffect(() => {
    const pulse = (el) => {
      if (el) {
        el.animate(
          [
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(1.2)", opacity: 0.7 },
            { transform: "scale(1)", opacity: 1 },
          ],
          {
            duration: 1500,
            iterations: Infinity,
            easing: "ease-in-out",
          }
        );
      }
    };

    pulse(newTagRef2.current);
  }, []);

  return (
    <div className="elements-container">
      {/* Section 1 */}
      <div
        className="section-card"
        onClick={() =>
          window.open("https://www.facebook.com/YOUR_FACEBOOK_LINK", "_blank")
        }
      >
        <div className="text-group">
          <div className="section-title-container">
            <h2 className="section-title">ULVOXO HAS A HEART</h2>
          </div>
          <div className="bio-container">
            <p className="bio emergency-bio">[Your bio text here]</p>
          </div>
        </div>
        <div className="lottie-wrap">
          <Lottie
            animationData={continueAnimation}
            loop={true}
            className="lottie-button"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div
        className="section-card"
        onClick={() => window.open("https://comeonsom.github.io/Ulvoxo-Update/", "_blank")}
      >
        <div className="text-group">
          <div className="section-title-container">
            <h2 className="section-title">ULVOXO UPDATES</h2>
            <span className="new-tag" ref={newTagRef2}>
              NEW
            </span>
          </div>
          <div className="bio-container">
            <p className="bio emergency-bio">[Your update text here]</p>
          </div>
        </div>
        <div className="lottie-wrap">
          <Lottie
            animationData={continueAnimation}
            loop={true}
            className="lottie-button"
          />
        </div>
      </div>
    </div>
  );
}
