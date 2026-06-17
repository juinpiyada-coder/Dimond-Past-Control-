import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { FiUsers, FiCalendar, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6']; // Emerald, Amber, Red, Blue

const OverviewModule = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/admin/dashboard/stats');
      setStats(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%' }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fecaca' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  const { overview, bookings_by_status, recent_bookings } = stats;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '1.75rem',
    borderRadius: '1.25rem',
    boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    transition: 'all 0.3s ease',
    cursor: 'default'
  };

  const cardHoverStyle = {
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-4px)'
  };

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
    >
      
      {/* Header */}
      <div>
        <h1 style={{ margin: 0, color: '#0f172a', fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>Dashboard Overview</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>Welcome back! Here's what's happening with your pest control business today.</p>
      </div>

      {/* Top Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        
        {/* Total Customers */}
        <motion.div variants={itemVariants} 
          style={cardStyle}
          onMouseOver={(e) => { Object.assign(e.currentTarget.style, cardHoverStyle); }}
          onMouseOut={(e) => { e.currentTarget.style.boxShadow = cardStyle.boxShadow; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', color: '#2563eb', padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiUsers size={28} />
          </div>
          <div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Customers</p>
            <h2 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em' }}>{overview.total_customers}</h2>
          </div>
        </motion.div>

        {/* Total Bookings */}
        <motion.div variants={itemVariants} 
          style={cardStyle}
          onMouseOver={(e) => { Object.assign(e.currentTarget.style, cardHoverStyle); }}
          onMouseOut={(e) => { e.currentTarget.style.boxShadow = cardStyle.boxShadow; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <div style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', color: '#d97706', padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiCalendar size={28} />
          </div>
          <div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Bookings</p>
            <h2 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em' }}>{overview.total_bookings}</h2>
          </div>
        </motion.div>

        {/* Total Revenue */}
        <motion.div variants={itemVariants} 
          style={cardStyle}
          onMouseOver={(e) => { Object.assign(e.currentTarget.style, cardHoverStyle); }}
          onMouseOut={(e) => { e.currentTarget.style.boxShadow = cardStyle.boxShadow; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <div style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)', color: '#059669', padding: '1.25rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FiDollarSign size={28} />
          </div>
          <div>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Revenue</p>
            <h2 style={{ margin: '0.25rem 0 0 0', color: '#0f172a', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.025em' }}>₹{overview.total_revenue.toLocaleString()}</h2>
          </div>
        </motion.div>

      </div>

      {/* Main Content Split: Chart & Table */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        
        {/* Pie Chart Section */}
        <motion.div variants={itemVariants} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#0f172a', fontSize: '1.125rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <FiTrendingUp style={{ color: '#2563eb' }} /> Bookings by Status
          </h3>
          
          {bookings_by_status.length > 0 ? (
            <div style={{ width: '100%', height: 320, position: 'relative' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={bookings_by_status}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={6}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                    stroke="none"
                  >
                    {bookings_by_status.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: `drop-shadow(0px 4px 6px rgba(0,0,0,0.1))` }} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} Bookings`, 'Count']}
                    contentStyle={{ borderRadius: '0.75rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '1rem' }}
                    itemStyle={{ fontWeight: 600, color: '#0f172a' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={40} 
                    iconType="circle"
                    formatter={(value) => <span style={{ color: '#475569', fontWeight: 500 }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              No booking data available.
            </div>
          )}
        </motion.div>

        {/* Recent Activity Table */}
        <motion.div variants={itemVariants} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.25rem', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#0f172a', fontSize: '1.125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recent Activity</h3>
          
          {recent_bookings.length > 0 ? (
            <div style={{ overflowX: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.5rem', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '0.5rem 1rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer</th>
                    <th style={{ padding: '0.5rem 1rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Service</th>
                    <th style={{ padding: '0.5rem 1rem', color: '#64748b', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent_bookings.map(b => (
                    <tr 
                      key={b.booking_id} 
                      style={{ transition: 'background-color 0.2s', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                    >
                      <td style={{ padding: '1rem', color: '#0f172a', fontWeight: 600, borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}>{b.customer_name || 'Guest'}</td>
                      <td style={{ padding: '1rem', color: '#475569', fontSize: '0.9rem' }}>{b.service_name || 'General Service'}</td>
                      <td style={{ padding: '1rem', borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }}>
                        <span style={{ 
                          backgroundColor: b.status === 'COMPLETED' ? '#dcfce7' : b.status === 'CANCELLED' ? '#fef2f2' : '#fef3c7', 
                          color: b.status === 'COMPLETED' ? '#166534' : b.status === 'CANCELLED' ? '#991b1b' : '#92400e', 
                          padding: '0.35rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.75rem', 
                          fontWeight: 700,
                          letterSpacing: '0.025em'
                        }}>
                          {b.status || 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
              No recent activity.
            </div>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default OverviewModule;
