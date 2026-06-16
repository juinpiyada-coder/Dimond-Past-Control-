import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import BookService from './pages/BookService';
import Auth from './pages/Auth';
import Dashboard from './pages/admin-module/Dashboard';

import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import UserDashboard from './pages/user-module/UserDashboard';

import AboutUs from './pages/AboutUs';

// Placeholder Pages
const Pricing = () => <div className="page container"><h1 className="section-title">Pricing</h1></div>;
const PestGuide = () => <div className="page container"><h1 className="section-title">Pest Identification Guide</h1></div>;
const FAQ = () => <div className="page container"><h1 className="section-title">FAQ</h1></div>;
const Contact = () => <div className="page container"><h1 className="section-title">Contact Us</h1></div>;
const Payment = () => <div className="page container"><h1 className="section-title">Payment Page</h1></div>;
const Reviews = () => <div className="page container"><h1 className="section-title">Reviews</h1></div>;

const MainLayout = () => (
  <div className="app-container">
    <Header />
    <main className="main-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Website Routes (Wrapped with Header/Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:name" element={<ServiceDetails />} />
          <Route path="/book" element={<BookService />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/guide" element={<PestGuide />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Auth />} />
          <Route path="/bookings" element={<Navigate to="/user-dashboard?tab=bookings" replace />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>

        {/* Standalone Admin Dashboard Route (No Header/Footer) */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
