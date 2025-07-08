import { useState, useEffect, useRef } from "react";
import "./styles/LoginModal.css";
import gsap from "gsap";
import Lottie from "lottie-react";
import successAnimation from "../animations/successfullogin.json";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../lib/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function LoginModal({ onClose, onLogin }) {
  const [step, setStep] = useState("loading"); // 'loading' | 'initial' | 'success' | 'profile' | 'confirmLogout'
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState("guest@ulvoxo");
  const [showDetails, setShowDetails] = useState(false);
  const modalRef = useRef(null);

  // Helper to build username
  const getUsername = (user) => {
    if (user?.email) {
      return user.email.split("@")[0] + "@ulvoxo";
    }
    if (user?.phoneNumber) {
      return user.phoneNumber.replace(/[^0-9]/g, "") + "@ulvoxo";
    }
    return "guest@ulvoxo";
  };

  // Entry animation
  useEffect(() => {
    if (step !== "loading" && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [step]);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        const uName = getUsername(user);
        setUsername(uName);
        sessionStorage.setItem("ulvoxoUser", uName); // ✅ Save username
        setStep("profile");
        onLogin?.({ user, username: uName });
      } else {
        setUserData(null);
        setUsername("guest@ulvoxo");
        sessionStorage.removeItem("ulvoxoUser"); // ✅ Clear on logout
        setStep("initial");
      }
    });
    return unsubscribe;
  }, [onLogin]);

  // Transition from success screen to profile after animation
  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => {
        setStep("profile");
      }, 1800); // Adjust to match animation length

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleOAuthLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const uName = getUsername(user);
      setUserData(user);
      setUsername(uName);
      sessionStorage.setItem("ulvoxoUser", uName); // ✅ Save username
      setStep("success");
      onLogin?.({ user, username: uName });
    } catch (error) {
      console.error("OAuth Login Error:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      setUsername("guest@ulvoxo");
      sessionStorage.removeItem("ulvoxoUser"); // ✅ Clear on logout
      setShowDetails(false);
      setStep("initial");
    } catch (error) {
      console.error("Logout Error:", error);
      alert(`Logout failed: ${error.message}`);
    }
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");
  const safe = (value, fallback = "Not specified") => value || fallback;

  // Auto-append ?user=username@ulvoxo to 4 specific links
  useEffect(() => {
    const targetLinks = [
      "https://www.xfactorial.online/",
      "https://xfactorialdi.web.app/",
      "https://comeonsom.github.io/X-by-ForLoop.com/",
      "https://comeonsom.github.io/Ulvoxo-Update/",
    ];
    const anchors = document.querySelectorAll("a");

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (href && targetLinks.some((link) => href.startsWith(link))) {
        const url = new URL(href, window.location.origin);
        if (!url.searchParams.has("user")) {
          url.searchParams.set("user", username);
          anchor.setAttribute("href", url.toString());
        }
      }
    });
  }, [username]);

  // LOADING SCREEN
  if (step === "loading") {
    return (
      <div className="modal-overlay">
        <div className="modal-loader" ref={modalRef}>
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container" ref={modalRef} tabIndex={-1}>
        <button
          className="modal-close"
          aria-label="Close"
          onClick={() => {
            if (showDetails) {
              setShowDetails(false);
            } else {
              onClose();
            }
          }}
        >
          &times;
        </button>

        {/* INITIAL LOGIN OPTIONS */}
        {step === "initial" && (
          <div className="modal-content">
            <h2>Welcome Back</h2>
            <p>Continue with your preferred account:</p>
            <div className="oauth-buttons">
              <button
                onClick={() => handleOAuthLogin(googleProvider)}
                className="oauth-btn google"
              >
                Google
              </button>
              <button
                onClick={() => handleOAuthLogin(facebookProvider)}
                className="oauth-btn facebook"
              >
                Facebook
              </button>
              <button
                onClick={() => handleOAuthLogin(githubProvider)}
                className="oauth-btn github"
              >
                GitHub
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS SCREEN */}
        {step === "success" && (
          <div className="success-container">
            <Lottie
              animationData={successAnimation}
              loop={false}
              autoplay
              style={{ width: 200, height: 200 }}
            />
            <p className="success-text">Login successful!</p>
          </div>
        )}

        {/* PROFILE SUMMARY */}
        {step === "profile" && userData && !showDetails && (
          <div
            className="profile-summary"
            role="button"
            tabIndex={0}
            onClick={() => setShowDetails(true)}
            onKeyDown={(e) => e.key === "Enter" && setShowDetails(true)}
          >
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="User avatar"
                className="profile-avatar"
              />
            ) : (
              <div className="profile-fallback">
                {getInitial(userData.displayName)}
              </div>
            )}
            <div className="profile-summary-text">
              <p>{safe(userData.displayName, "Guest")}</p>
              <small>Username: {username}</small>
            </div>
          </div>
        )}

        {/* PROFILE DETAILS */}
        {showDetails && userData && (
          <div className="profile-details">
            {userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="User avatar"
                className="profile-avatar-lg"
              />
            ) : (
              <div className="profile-fallback-lg">
                {getInitial(userData.displayName)}
              </div>
            )}

            <div className="profile-field">
              Name: {safe(userData.displayName)}
            </div>
            <div className="profile-field">Email: {safe(userData.email)}</div>
            <div className="profile-field">
              Phone: {safe(userData.phoneNumber)}
            </div>
            <div className="profile-field">Username: {username}</div>

            <div className="logout-confirm">
              <button
                className="logout-btn"
                onClick={() => setStep("confirmLogout")}
              >
                Log out
              </button>
            </div>
          </div>
        )}

        {/* LOGOUT CONFIRMATION */}
        {step === "confirmLogout" && (
          <div className="logout-confirmation">
            <h3>Confirm Logout</h3>
            <div className="confirmation-actions">
              <button className="btn-yes" onClick={handleLogout}>
                Yes, Logout
              </button>
              <button
                className="btn-no"
                onClick={() => setStep("profile")}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
