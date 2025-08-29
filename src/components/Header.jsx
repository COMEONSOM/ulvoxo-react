// ============================================================
// HEADER COMPONENT (2026 READY)
// RENDERS BRAND LOGO + AUTH AREA (LOTTIE LOGIN / PROFILE AVATAR)
// USES FIREBASE AUTH STATE + OPENS LoginModal WHEN NEEDED
// ============================================================

import { useState, useEffect } from "react";
import "./styles/Header.css";
import LoginModal from "./LoginModal";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Lottie from "lottie-react";
import loginAnimation from "../animations/login.json";

export default function Header() {
  // ============================================================
  // LOCAL STATE
  // showLogin → CONTROLS VISIBILITY OF LOGIN MODAL
  // user      → CURRENT AUTHENTICATED USER OBJECT (FIREBASE USER)
  // ============================================================
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  // ============================================================
  // FIREBASE AUTH STATE LISTENER (SINGLE SOURCE OF TRUTH)
  // ============================================================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
    });
    return unsubscribe; // CLEANUP ON UNMOUNT
  }, []);

  // ============================================================
  // LOGIN CALLBACK (RECEIVES RAW FIREBASE USER)
  // NOTE: WE ALWAYS PASS BACK THE RAW USER (NO NESTED OBJECT)
  // ============================================================
  const handleLogin = (firebaseUser) => {
    setUser(firebaseUser);
    setShowLogin(false);
  };

  // ============================================================
  // LOGOUT HANDLER
  // ============================================================
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowLogin(false);
    } catch (error) {
      console.error("ERROR DURING LOGOUT:", error);
    }
  };

  // ============================================================
  // UTILITY: GET INITIAL LETTER FOR FALLBACK AVATAR
  // ============================================================
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <header className="header" role="banner">
      {/* LOGO SECTION */}
      <div className="logo">
        <img
          src="/assets/ulvoxo-logo.png"
          alt="Ulvoxo Logo"
          className="logo-img"
          draggable="false"
        />
      </div>

      {/* AUTH AREA */}
      <div className="auth-area">
        {user ? (
          // ======================================================
          // LOGGED-IN → SHOW PROFILE AVATAR (OPENS PROFILE MODAL)
          // ======================================================
          <button
            className="profile-button"
            onClick={() => {
              // signal the modal to open directly in profile details
              try { sessionStorage.setItem("ulvoxoOpenProfileDetails", "1"); } catch {}
              setShowLogin(true);
            }}
            aria-label="Open profile menu"
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="User avatar" className="avatar" />
            ) : (
              <div className="avatar-fallback" aria-hidden="true">
                {getInitial(user.displayName)}
              </div>
            )}
          </button>
        ) : (
          // ======================================================
          // LOGGED-OUT → SHOW LOTTIE LOGIN LAUNCHER
          // ENTIRE AREA IS CLICKABLE; TEXT IS PURELY DECORATIVE
          // ======================================================
          <button
            type="button"
            className="login-animation"
            onClick={() => setShowLogin(true)}
            aria-label="Open login"
          >
            <Lottie animationData={loginAnimation} loop autoplay />
            <span className="login-hint" aria-hidden="true">
              Login Here →
            </span>
          </button>
        )}
      </div>

      {/* LOGIN MODAL (PORTAL-STYLE OVERLAY) */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
}
