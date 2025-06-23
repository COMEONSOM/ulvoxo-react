import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BgAnimation from "./components/BgAnimation"; // Your renamed AnimatedBackdrop
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import AboutCompany from "./components/AboutCompany";
import ContactFollow from "./components/ContactFollow";
import Footer from "./components/Footer";
import './index.css';

function HomePage() {
  return (
    <div className="relative z-10">
      <Header />
      <Navbar />
      <AboutCompany />
      <ContactFollow />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="relative">
      {/* Global background animation */}
      <BgAnimation />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes like /about, /contact etc. here */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
