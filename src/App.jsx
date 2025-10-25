// src/App.jsx
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AboutCompany from "./components/AboutCompany";
import Elements from "./components/Elements";
import ContactFollow from "./components/ContactFollow";
import Footer from "./components/Footer";
import './App.css';
import Promotion from "./components/Promotion";

export default function App() {
  return (
        <>
          <Header />
          <Promotion/>
          <Navbar />
          <AboutCompany />
          <Elements />
          <ContactFollow />
          <Footer />
        </>
      )}
