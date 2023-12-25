import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Treatment from './components/Treatment';
import HealthBlogs from './components/HealthBlogs';
import About from './components/About';
import BookAppointment from './components/BookAppointment';
import Footer from './components/Footer';
import FAQs from './components/FAQs';
import BookingSlotIdConfirmation from './components/BookingSlotIdConfirmation';
import LoginDetails from './components/LoginDetails';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="mt-20"> {/* Add margin-top to create space for the fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/treatment" element={<Treatment />} />
            <Route path="/health-blogs" element={<HealthBlogs />} />
            <Route path="/about" element={<About />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/booking-confirmation" element={<BookingSlotIdConfirmation />} />
          </Routes>
        </div>
      </Router>
      <FAQs />
      <Footer />
    </div>
  );
}

export default App;

