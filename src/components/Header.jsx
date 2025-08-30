import { useState, useRef, useEffect } from "react";
import "./styles/Header.css";

import LoginModal from "./LoginModal";
import Lottie from "lottie-react";
import headerBackground from "../animations/headerbackground.json";
import loginAnimation from "../animations/login.json";

import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Keep header in sync with Firebase session
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return unsub;
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleLoginSuccess = (firebaseUser) => {
    // Let the modal show success + countdown; just sync state here.
    setUser(firebaseUser);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setShowDropdown(false);
    }
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

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
          <div className="relative" ref={dropdownRef}>
            {/* Profile button — avatar only (no name beside it) */}
            <button
              className="profile-button"
              onClick={() => setShowDropdown((p) => !p)}
              aria-haspopup="menu"
              aria-expanded={showDropdown}
              aria-label="Open profile menu"
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
                <div className="avatar-fallback">{getInitial(user.displayName)}</div>
              )}
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="profile-dropdown" role="menu">
                <div className="p-3 border-b">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="profile"
                        style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          display: "grid",
                          placeItems: "center",
                          background: "var(--color-primary)",
                          color: "#fff",
                          fontWeight: "700",
                        }}
                      >
                        {getInitial(user.displayName)}
                      </div>
                    )}
                    <div>
                      <p style={{ fontWeight: 600 }}>
                        {user.displayName || "Not specified"}
                      </p>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {user.email || "Not specified"}
                      </p>
                      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                        {user.phoneNumber || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLoginSuccess}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
}
