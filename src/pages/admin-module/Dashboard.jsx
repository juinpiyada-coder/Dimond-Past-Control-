import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import BlogDataEntry from './BlogDataEntry';
import UserDataEntry from './UserDataEntry';
import GenericModule from './GenericModule';
import { FiGrid, FiFileText, FiUsers, FiSettings, FiLogOut, FiPlus, FiEdit2, FiTrash2, FiImage, FiTool, FiStar, FiShare2, FiShield, FiFile, FiCalendar, FiBriefcase, FiMenu, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Skeleton from '../../components/Skeleton';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Navigation State
  const [activeTab, setActiveTab] = useState('blogs'); // 'dashboard', 'blogs', 'users', 'settings'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState(['Overview', 'Operations', 'Master Data', 'Marketing']);
  
  // View State for Blogs
  const [blogView, setBlogView] = useState('grid'); // 'grid' or 'editor'
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Users State
  const [users, setUsers] = useState([]);
  const [userView, setUserView] = useState('grid');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/profile');
    }
  }, [navigate]);

  useEffect(() => {
    if (activeTab === 'blogs' && blogView === 'grid') {
      fetchBlogs();
    }
    if (activeTab === 'users' && userView === 'grid') {
      fetchUsers();
    }
  }, [activeTab, blogView, userView]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await apiCall('/blogs');
      if (Array.isArray(result)) {
        setBlogs(result);
      } else if (result && result.error) {
        throw new Error(result.error);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch blogs');
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await apiCall(`/blogs/${id}`, 'DELETE');
      fetchBlogs();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const openEditor = (id = null) => {
    setEditingBlogId(id);
    setBlogView('editor');
  };

  const closeEditor = () => {
    setEditingBlogId(null);
    setBlogView('grid');
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await apiCall('/users');
      if (Array.isArray(result)) {
        setUsers(result);
      } else if (result && result.error) {
        throw new Error(result.error);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await apiCall(`/users/${id}`, 'DELETE');
      fetchUsers();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const openUserEditor = (id = null) => {
    setEditingUserId(id);
    setUserView('editor');
  };

  const closeUserEditor = () => {
    setEditingUserId(null);
    setUserView('grid');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/profile');
  };

  const toggleGroup = (groupLabel) => {
    setExpandedGroups(prev => 
      prev.includes(groupLabel) 
        ? prev.filter(g => g !== groupLabel) 
        : [...prev, groupLabel]
    );
  };

  const renderBlogGrid = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a', fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>Blog Management</h1>
          <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>Create, edit, and manage your articles seamlessly.</p>
        </div>
        <button 
          onClick={() => openEditor()}
          style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.875rem 1.75rem', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)', transition: 'all 0.2s ease-in-out' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <FiPlus size={18} /> Write New Post
        </button>
      </div>

      {loading && blogs.length === 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {Array(3).fill(0).map((_, idx) => (
            <div key={idx} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
              <Skeleton height="180px" borderRadius="0" />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <Skeleton height="24px" width="80%" />
                <Skeleton height="16px" width="100%" />
                <Skeleton height="16px" width="60%" />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <Skeleton height="36px" width="60px" borderRadius="8px" />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Skeleton height="36px" width="36px" borderRadius="8px" />
                    <Skeleton height="36px" width="36px" borderRadius="8px" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error && blogs.length === 0 ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '1rem 1.5rem', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <strong>Error:</strong> {error}
        </div>
      ) : blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: 'white', borderRadius: '1rem', border: '1px dashed #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#94a3b8' }}>
            <FiFileText size={64} />
          </div>
          <h3 style={{ color: '#334155', fontSize: '1.25rem', marginBottom: '0.5rem' }}>No articles yet</h3>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Get started by creating your very first blog post!</p>
          <button onClick={() => openEditor()} style={{ backgroundColor: 'white', color: '#0f172a', border: '1px solid #e2e8f0', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <FiPlus /> Create Article
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {blogs.map(blog => (
            <div key={blog.blog_id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', display: 'flex', flexDirection: 'column', border: '1px solid #f1f5f9', transition: 'all 0.3s ease' }}
                 onMouseOver={(e) => { e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                 onMouseOut={(e) => { e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {blog.featured_image ? (
                <img src={blog.featured_image} alt={blog.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '180px', backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', borderBottom: '1px solid #f1f5f9' }}>
                  <FiImage size={32} style={{ marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.875rem' }}>No Cover Image</span>
                </div>
              )}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: '0 0 0.75rem 0', color: '#0f172a', fontSize: '1.25rem', fontWeight: 700, lineHeight: '1.4' }}>{blog.title}</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>{blog.short_description || 'No description provided.'}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.25rem', borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published</span>
                    <span style={{ fontSize: '0.875rem', color: '#334155', fontWeight: 500 }}>
                      {blog.published_at ? new Date(blog.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Draft'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => openEditor(blog.blog_id)}
                      title="Edit Post"
                      style={{ backgroundColor: '#f1f5f9', color: '#334155', border: 'none', width: '36px', height: '36px', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.blog_id)}
                      title="Delete Post"
                      style={{ backgroundColor: '#fef2f2', color: '#ef4444', border: 'none', width: '36px', height: '36px', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderUserGrid = () => (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ margin: 0, color: '#0f172a', fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.025em' }}>User Management</h1>
          <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>Manage your administrators, customers, and employees.</p>
        </div>
        <button 
          onClick={() => openUserEditor()}
          style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '0.875rem 1.75rem', borderRadius: '0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)', transition: 'all 0.2s ease-in-out' }}
        >
          <FiPlus size={18} /> Add New User
        </button>
      </div>

      {loading && users.length === 0 ? (
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="80px" /></th>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="120px" /></th>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="60px" /></th>
                <th style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="60px" /></th>
                <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}><Skeleton height="20px" width="60px" style={{ marginLeft: 'auto' }} /></th>
              </tr>
            </thead>
            <tbody>
              {Array(5).fill(0).map((_, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="20px" width="120px" /></td>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="16px" width="150px" style={{ marginBottom: '5px' }} /><Skeleton height="16px" width="100px" /></td>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="24px" width="80px" borderRadius="12px" /></td>
                  <td style={{ padding: '1rem 1.5rem' }}><Skeleton height="24px" width="80px" borderRadius="12px" /></td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <Skeleton height="32px" width="32px" borderRadius="6px" />
                      <Skeleton height="32px" width="32px" borderRadius="6px" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : error && users.length === 0 ? (
        <div style={{ backgroundColor: '#fef2f2', border: '1px solid #f87171', color: '#b91c1c', padding: '1rem 1.5rem', borderRadius: '0.75rem' }}>{error}</div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>Name</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>Contact</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>Role</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: 600, fontSize: '0.875rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: '#0f172a' }}>{user.full_name}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                    <div>{user.email || 'N/A'}</div>
                    <div>{user.phone}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ backgroundColor: user.role_id == 1 ? '#fee2e2' : user.role_id == 3 ? '#fef3c7' : '#e0f2fe', color: user.role_id == 1 ? '#991b1b' : user.role_id == 3 ? '#92400e' : '#075985', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {user.role_id == 1 ? 'Admin' : user.role_id == 3 ? 'Employee' : 'Customer'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ backgroundColor: user.status === 'ACTIVE' ? '#dcfce7' : '#fef2f2', color: user.status === 'ACTIVE' ? '#166534' : '#991b1b', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => openUserEditor(user.user_id)} style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', backgroundColor: 'white', color: '#64748b', cursor: 'pointer' }}><FiEdit2 size={16} /></button>
                      <button onClick={() => handleDeleteUser(user.user_id)} style={{ padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0', backgroundColor: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );

  const navGroups = [
    {
      groupLabel: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <FiGrid size={20} /> },
      ]
    },
    {
      groupLabel: 'Operations',
      items: [
        { id: 'bookings', label: 'Bookings', icon: <FiCalendar size={20} /> },
        { id: 'employee_assignments', label: 'Assignments', icon: <FiBriefcase size={20} /> },
        { id: 'service_images', label: 'Service Images', icon: <FiImage size={20} /> },
        { id: 'invoices', label: 'Invoices', icon: <FiFile size={20} /> },
      ]
    },
    {
      groupLabel: 'Master Data',
      items: [
        { id: 'users', label: 'Users', icon: <FiUsers size={20} /> },
        { id: 'services', label: 'Services', icon: <FiTool size={20} /> },
        { id: 'pest_types', label: 'Pest Types', icon: <FiShield size={20} /> },
      ]
    },
    {
      groupLabel: 'Marketing',
      items: [
        { id: 'blogs', label: 'Blogs', icon: <FiFileText size={20} /> },
        { id: 'reviews', label: 'Reviews', icon: <FiStar size={20} /> },
        { id: 'referrals', label: 'Referrals', icon: <FiShare2 size={20} /> },
      ]
    },
    {
      groupLabel: 'System',
      items: [
        { id: 'settings', label: 'Settings', icon: <FiSettings size={20} /> }
      ]
    }
  ];

  // Helper to find the active label across all groups
  const getActiveTabLabel = () => {
    for (const group of navGroups) {
      const item = group.items.find(i => i.id === activeTab);
      if (item) return item.label;
    }
    return '';
  };
  
  // Helper to find the active icon across all groups
  const getActiveTabIcon = () => {
    for (const group of navGroups) {
      const item = group.items.find(i => i.id === activeTab);
      if (item) return item.icon;
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Professional Sidebar */}
      <div style={{ 
        width: isSidebarOpen ? '280px' : '0px', 
        backgroundColor: '#ffffff', 
        borderRight: isSidebarOpen ? '1px solid #e2e8f0' : 'none', 
        display: 'flex', 
        flexDirection: 'column', 
        flexShrink: 0, 
        boxShadow: isSidebarOpen ? '1px 0 10px rgba(0,0,0,0.02)' : 'none',
        transition: 'all 0.3s ease',
        overflow: 'hidden'
      }}>
        
        {/* Logo Area */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.25rem', boxShadow: '0 4px 10px rgba(37,99,235,0.3)' }}>
              D
            </div>
            <div>
              <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.025em' }}>Diamond</h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Control</p>
            </div>
          </div>
        </div>

        {/* Navigation - Grouped Accordion */}
        <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto' }}>
          {navGroups.map((group, idx) => {
            const isExpanded = expandedGroups.includes(group.groupLabel);
            return (
              <div key={group.groupLabel} style={{ marginBottom: '0.5rem' }}>
                <button
                  onClick={() => toggleGroup(group.groupLabel)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  <span>{group.groupLabel}</span>
                  {isExpanded ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                </button>
                
                {isExpanded && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
                    {group.items.map(item => {
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setBlogView('grid'); // reset to grid when clicking tabs
                            setUserView('grid');
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            width: '100%',
                            padding: '0.75rem 1rem',
                            border: 'none',
                            borderRadius: '0.5rem',
                            backgroundColor: isActive ? '#eff6ff' : 'transparent',
                            color: isActive ? '#2563eb' : '#475569',
                            fontWeight: isActive ? 600 : 500,
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease',
                            fontSize: '0.9rem'
                          }}
                          onMouseOver={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = '#f8fafc';
                              e.currentTarget.style.color = '#0f172a';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.color = '#475569';
                            }
                          }}
                        >
                          <div style={{ color: isActive ? '#3b82f6' : '#94a3b8', display: 'flex' }}>
                            {item.icon}
                          </div>
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User / Logout */}
        <div style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <button 
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem', border: 'none', background: 'none', color: '#64748b', fontWeight: 500, cursor: 'pointer', transition: 'color 0.2s', fontSize: '0.95rem' }}
            onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
          >
            <FiLogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Header Bar */}
        <div style={{ height: '70px', backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0 2rem', position: 'sticky', top: 0, zIndex: 10 }}>
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.5rem', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', transition: 'background-color 0.2s' }}
             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
             onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
           >
             <FiMenu size={24} />
           </button>
           <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 500 }}>
             <span style={{ color: '#cbd5e1' }}>Pages /</span> {getActiveTabLabel()}
           </div>
        </div>

        {/* Dynamic Content */}
        <div style={{ padding: '3rem', flex: 1 }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {activeTab === 'blogs' ? (
              blogView === 'grid' ? renderBlogGrid() : <BlogDataEntry blogId={editingBlogId} onClose={closeEditor} />
            ) : activeTab === 'users' ? (
              userView === 'grid' ? renderUserGrid() : <UserDataEntry userId={editingUserId} onClose={closeUserEditor} />
            ) : activeTab === 'dashboard' || activeTab === 'settings' ? (
              <div style={{ textAlign: 'center', padding: '6rem 2rem', backgroundColor: 'white', borderRadius: '1rem', border: '1px dashed #cbd5e1' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#cbd5e1' }}>
                  {getActiveTabIcon()}
                </div>
                <h2 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>{getActiveTabLabel()} Module</h2>
                <p style={{ color: '#64748b' }}>This section is currently under construction and will be available soon.</p>
              </div>
            ) : (
              <GenericModule moduleKey={activeTab} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
