import { useState, useEffect } from "react";
import "./styles/Header.css";
import LoginModal from "./LoginModal";
import Lottie from "lottie-react";
import headerBackground from "../animations/headerbackground.json";
import loginAnimation from "../animations/login.json";

import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Keep header in sync with Firebase session
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return unsub;
  }, []);

  const handleLoginSuccess = (firebaseUser) => {
    // Sync state with modal after login
    setUser(firebaseUser);
  };

  return (
    <header className="header" role="banner">
      {/* Animated background */}
      <div className="header-bg" aria-hidden="true">
        <Lottie
          animationData={headerBackground}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Logo */}
      <div className="logo">
        <img
          src="/assets/ulvoxo-logo.png"
          alt="Ulvoxo Logo"
          className="logo-img"
          draggable="false"
        />
      </div>

      {/* Right side: auth area */}
      <div className="auth-area relative">
        {!user ? (
          <button
            className="login-animation"
            onClick={() => setIsLoginOpen(true)}
            aria-label="Open login"
          >
            <Lottie animationData={loginAnimation} loop autoplay />
            <span className="login-hint">Login Here →</span>
          </button>
        ) : (
          <button
            className="profile-button"
            onClick={() => {
              // Open login modal directly in profile mode
              sessionStorage.setItem("ulvoxoOpenProfileDetails", "1");
              setIsLoginOpen(true);
            }}
            aria-label="Open profile"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="User avatar"
                className="avatar"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="avatar-fallback">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </button>
        )}
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLoginSuccess}
        />
      )}
    </header>
  );
}
