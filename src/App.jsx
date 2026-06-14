import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import BookService from './pages/BookService';
import Auth from './pages/Auth';

import Bookings from './pages/Bookings';

// Placeholder Pages
const About = () => <div className="page container"><h1 className="section-title">About Us</h1></div>;
const Pricing = () => <div className="page container"><h1 className="section-title">Pricing</h1></div>;
const PestGuide = () => <div className="page container"><h1 className="section-title">Pest Identification Guide</h1></div>;
const Blog = () => <div className="page container"><h1 className="section-title">Blog</h1></div>;
const FAQ = () => <div className="page container"><h1 className="section-title">FAQ</h1></div>;
const Contact = () => <div className="page container"><h1 className="section-title">Contact Us</h1></div>;
const Payment = () => <div className="page container"><h1 className="section-title">Payment Page</h1></div>;
const Reviews = () => <div className="page container"><h1 className="section-title">Reviews</h1></div>;

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/book" element={<BookService />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/guide" element={<PestGuide />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Auth />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
