import React, { useState, useEffect } from 'react';
import { apiCall } from '../../utils/api';

const BlogDataEntry = ({ blogId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [error, setError] = useState('');
  const isEditing = !!blogId;

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    short_description: '',
    content: '',
    featured_image: '',
    published_at: ''
  });

  useEffect(() => {
    if (isEditing) {
      fetchBlogData();
    }
  }, [blogId]);

  const fetchBlogData = async () => {
    setInitialLoading(true);
    setError('');
    try {
      const blog = await apiCall(`/blogs/${blogId}`);
      if (blog && !blog.error) {
        setFormData({
          title: blog.title || '',
          slug: blog.slug || '',
          short_description: blog.short_description || '',
          content: blog.content || '',
          featured_image: blog.featured_image || '',
          published_at: blog.published_at ? blog.published_at.substring(0, 16) : ''
        });
      } else if (blog.error) {
        throw new Error(blog.error);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch blog details');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
          setFormData(prev => ({ ...prev, featured_image: compressedDataUrl }));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditing) {
        await apiCall(`/blogs/${blogId}`, 'PUT', formData);
      } else {
        await apiCall('/blogs', 'POST', formData);
      }
      onClose(); // Triggers a refresh and goes back to grid
    } catch (err) {
      setError(err.message || 'Failed to save blog');
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading Editor...</div>;
  }

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Component Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '1rem' }}>
            &larr; Back
          </button>
          <div style={{ height: '24px', width: '1px', backgroundColor: '#d1d5db' }}></div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>
            {isEditing ? 'Edit Post' : 'New Post'}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={onClose} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: 'white', cursor: 'pointer', fontWeight: 500, color: '#374151' }}>
            Discard
          </button>
          <button type="submit" form="blogForm" disabled={loading} style={{ padding: '0.5rem 1.5rem', border: 'none', borderRadius: '0.375rem', backgroundColor: '#4f46e5', color: 'white', cursor: 'pointer', fontWeight: 600, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
            {loading ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <div>
        {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>{error}</div>}
        
        <form id="blogForm" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
          
          {/* Main Content Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
                placeholder="Post Title" 
                style={{ width: '100%', fontSize: '2.5rem', fontWeight: 700, border: 'none', outline: 'none', color: '#111827', marginBottom: '1rem', padding: 0 }} 
              />
              <div style={{ height: '1px', width: '100%', backgroundColor: '#e5e7eb', marginBottom: '1.5rem' }}></div>
              <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange} 
                required 
                placeholder="Write your amazing post here..." 
                style={{ width: '100%', minHeight: '500px', fontSize: '1.125rem', lineHeight: '1.75', border: 'none', outline: 'none', resize: 'vertical', color: '#374151', fontFamily: 'inherit', padding: 0 }} 
              />
            </div>
          </div>

          {/* Sidebar Settings Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1rem' }}>Publishing</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563' }}>Publish Date</label>
                <input 
                  type="datetime-local" 
                  name="published_at" 
                  value={formData.published_at} 
                  onChange={handleChange} 
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }} 
                />
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1rem' }}>Post Settings</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563' }}>URL Slug</label>
                  <input 
                    type="text" 
                    name="slug" 
                    value={formData.slug} 
                    onChange={handleChange} 
                    required 
                    placeholder="my-awesome-post" 
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }} 
                  />
                  <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>This will be the URL of the post.</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563' }}>Short Description</label>
                  <textarea 
                    name="short_description" 
                    value={formData.short_description} 
                    onChange={handleChange} 
                    rows="3" 
                    placeholder="A brief summary for previews..." 
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none', resize: 'vertical' }} 
                  />
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: '#111827', fontSize: '1rem' }}>Featured Image</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4b5563', cursor: 'pointer', padding: '0.5rem', border: '1px dashed #d1d5db', borderRadius: '0.375rem', textAlign: 'center', backgroundColor: '#f9fafb' }}>
                  Upload Image
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload} 
                    style={{ display: 'none' }} 
                  />
                </label>
                <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', margin: '0.25rem 0' }}>OR</div>
                <input 
                  type="text" 
                  name="featured_image" 
                  value={formData.featured_image} 
                  onChange={handleChange} 
                  placeholder="Paste image URL here..." 
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none' }} 
                />
                {formData.featured_image && (
                  <div style={{ marginTop: '0.5rem', borderRadius: '0.375rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                    <img src={formData.featured_image} alt="Preview" style={{ width: '100%', display: 'block', maxHeight: '150px', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogDataEntry;
