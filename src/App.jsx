import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetails = lazy(() => import('./pages/ServiceDetails'));
const BookService = lazy(() => import('./pages/BookService'));
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/admin-module/Dashboard'));

const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const UserDashboard = lazy(() => import('./pages/user-module/UserDashboard'));

const AboutUs = lazy(() => import('./pages/AboutUs'));

// Placeholder Pages
const Pricing = () => <div className="page container"><h1 className="section-title">Pricing</h1></div>;
const PestGuide = () => <div className="page container"><h1 className="section-title">Pest Identification Guide</h1></div>;
const FAQ = () => <div className="page container"><h1 className="section-title">FAQ</h1></div>;
const Contact = () => <div className="page container"><h1 className="section-title">Contact Us</h1></div>;
const Payment = () => <div className="page container"><h1 className="section-title">Payment Page</h1></div>;
const Reviews = () => <div className="page container"><h1 className="section-title">Reviews</h1></div>;

import FifaLoader from './components/FifaLoader';

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Suspense fallback={<FifaLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

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
          <Route path="/bookings" element={<Navigate to="/user-dashboard?tab=bookings" replace />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>

        {/* Standalone Admin Dashboard Route (No Header/Footer) */}
        <Route path="/dashboard" element={<Suspense fallback={<FifaLoader />}><Dashboard /></Suspense>} />
        <Route path="/profile" element={<Suspense fallback={<FifaLoader />}><Auth /></Suspense>} />
      </Routes>
    </Router>
  );
}

export default App;
