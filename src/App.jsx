// src/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AboutCompany from "./components/AboutCompany";
import Elements from "./components/Elements";
import ContactFollow from "./components/ContactFollow";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay (you can replace this with real data fetching)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Navbar />
          <AboutCompany />
          <Elements />
          <ContactFollow />
          <Footer />
        </>
      )}
    </>
  );
}
