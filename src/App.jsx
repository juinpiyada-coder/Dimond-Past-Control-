import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FifaLoader from './components/FifaLoader';

import Home from './pages/Home';
import Services from './pages/Services';
import AllServices from './pages/AllServices';
import ServiceDetails from './pages/ServiceDetails';
import BookService from './pages/BookService';
import Auth from './pages/Auth';
import Dashboard from './pages/admin-module/Dashboard';

import Cockroaches from './pages/service-module/Cockroaches';
import Termites from './pages/service-module/Termites';
import BedBugs from './pages/service-module/BedBugs';
import Rodents from './pages/service-module/Rodents';
import Mosquitoes from './pages/service-module/Mosquitoes';
import Ants from './pages/service-module/Ants';
import WoodBorer from './pages/service-module/WoodBorer';

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

const MainLayout = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const SettingsContext = React.createContext({});
export const MenuContext = React.createContext([]);

function App() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({});
  const [menus, setMenus] = useState([]);

  React.useEffect(() => {
    Promise.all([
      fetch(import.meta.env.VITE_API_BASE_URL + '/settings').then(r => r.json()),
      fetch(import.meta.env.VITE_API_BASE_URL + '/menus').then(r => r.json())
    ])
    .then(([settingsData, menusData]) => {
      setSettings(settingsData);
      setMenus(Array.isArray(menusData) ? menusData : []);
      setLoading(false);
    })
    .catch(err => {
      console.error("Failed to fetch global data:", err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <FifaLoader />;
  }

  return (
    <SettingsContext.Provider value={settings}>
    <MenuContext.Provider value={menus}>
      <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <Routes>
        {/* Main Website Routes (Wrapped with Header/Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/all-services" element={<AllServices />} />
          
          {/* Static Core Service Pages */}
          <Route path="/service/cockroaches" element={<Cockroaches />} />
          <Route path="/service/termites" element={<Termites />} />
          <Route path="/service/bed-bugs" element={<BedBugs />} />
          <Route path="/service/rodents" element={<Rodents />} />
          <Route path="/service/mosquitoes" element={<Mosquitoes />} />
          <Route path="/service/ants" element={<Ants />} />
          <Route path="/service/wood-borer" element={<WoodBorer />} />
          
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Auth />} />
      </Routes>
    </Router>
    </MenuContext.Provider>
    </SettingsContext.Provider>
  );
}

export default App;
