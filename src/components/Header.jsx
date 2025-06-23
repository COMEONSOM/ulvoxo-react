import "../components/styles/Header.css"; // global import now
import { useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from "../lib/firebase";

const auth = getAuth(app);

export default function Header() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const sendOTP = async () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {},
      });
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, "+91" + phone, window.recaptchaVerifier);
      setConfirmation(confirmationResult);
      setOtpSent(true);
      alert("OTP sent to +" + phone);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    try {
      await confirmation.confirm(otp);
      alert("Login successful!");
    } catch {
      alert("Incorrect OTP");
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>OLVOXO</h1>
      </div>
      <div className="login">
        {!otpSent ? (
          <div className="loginForm">
            <input
              type="tel"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={sendOTP}>Send OTP</button>
          </div>
        ) : (
          <div className="otpForm">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOTP}>Verify</button>
          </div>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </header>
  );
}
