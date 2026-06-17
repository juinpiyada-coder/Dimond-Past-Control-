import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await apiCall('/blogs');
      setBlogs(response || []);
    } catch (err) {
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page container" style={{ padding: '4rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="section-title">Our Latest News & Tips</h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
          Discover the latest insights, expert tips, and news about pest control to keep your home safe and clean.
        </p>
      </div>

      {loading && (
        <div style={{ padding: '50px', textAlign: 'center' }}>Loading blogs...</div>
      )}
      
      {error && <div style={{ textAlign: 'center', padding: '2rem', color: '#dc2626', backgroundColor: '#fee2e2', borderRadius: '0.5rem', marginBottom: '2rem' }}>{error}</div>}

      {!loading && !error && blogs.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', backgroundColor: '#f3f4f6', borderRadius: '0.5rem' }}>
          No blog posts published yet. Check back soon!
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {blogs.map(blog => (
          <div key={blog.blog_id} style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
            <div style={{ height: '200px', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
              {blog.featured_image ? (
                <img src={blog.featured_image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>No Image</div>
              )}
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                <Calendar size={16} />
                <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'Draft'}</span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {blog.title}
              </h3>
              
              <p style={{ color: '#4b5563', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
                {blog.short_description || blog.content.substring(0, 120) + '...'}
              </p>
              
              <Link to={`/blog/${blog.blog_id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', fontWeight: 600, textDecoration: 'none', marginTop: 'auto' }}>
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
