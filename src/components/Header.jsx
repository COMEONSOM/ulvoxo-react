import { useState, useEffect } from "react";
import "./styles/Header.css";
import LoginModal from "./LoginModal";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user || null);
    });
    return unsubscribe;
  }, []);

  const handleLogin = ({ user }) => {
    setUser(user);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setShowLogin(false);
    });
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo.png" alt="Ulvoxo Logo" className="logo-img" />
      </div>

      <div className="auth-area">
        {user ? (
          <button
            className="profile-button"
            onClick={() => setShowLogin(true)}
            aria-label="Open profile menu"
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" className="avatar" />
            ) : (
              <div className="avatar-fallback">
                {getInitial(user.displayName)}
              </div>
            )}
          </button>
        ) : (
          <button
            className="login-button"
            onClick={() => setShowLogin(true)}
            aria-label="Login"
          >
            Login
          </button>
        )}
      </div>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </header>
  );
}
