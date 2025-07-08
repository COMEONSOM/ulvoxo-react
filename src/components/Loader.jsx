import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading.json";

export default function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-animation">
        <Lottie animationData={loadingAnimation} loop={true} className="w-full h-full" />
      </div>
    </div>
  );
}
