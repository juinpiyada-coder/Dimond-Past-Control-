import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Comments State
  const [comments, setComments] = useState([]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await apiCall(`/blogs/${id}/comments`);
      setComments(response || []);
    } catch (err) {
      console.error('Failed to fetch comments', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await apiCall(`/blogs/${id}/comments`, 'POST', {
        author_name: newCommentName,
        content: newCommentText
      });
      setComments([newComment, ...comments]);
      setNewCommentName('');
      setNewCommentText('');
    } catch (err) {
      alert('Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title || 'Diamond Pest Control Blog',
        text: blog?.short_description || 'Check out this article!',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await apiCall(`/blogs/${id}`);
      if (response && !response.error) {
        setBlog(response);
      } else {
        throw new Error('Blog not found');
      }
    } catch (err) {
      setError('Failed to load this blog post. It may have been removed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page container" style={{ padding: '6rem 1rem', textAlign: 'center', color: '#6b7280' }}>Loading post...</div>;
  }

  if (error || !blog) {
    return (
      <div className="page container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: '2rem', borderRadius: '0.5rem', display: 'inline-block', marginBottom: '2rem' }}>
          {error}
        </div>
        <div>
          <button onClick={() => navigate('/blog')} className="btn btn-primary">Return to Blog List</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ backgroundColor: '#fdfdfd' }}>
      
      {/* WP-style Header Section */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem 1.5rem' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', fontWeight: 600, textDecoration: 'none', marginBottom: '2rem', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
          <ArrowLeft size={16} /> Back to Articles
        </Link>

        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#111827', marginBottom: '1.5rem', lineHeight: 1.15, fontFamily: '"Playfair Display", "Merriweather", Georgia, serif' }}>
          {blog.title}
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
               <img src="https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff" alt="Author" style={{ width: '100%', height: '100%' }} />
            </div>
            <div>
              <div style={{ fontWeight: 600, color: '#111827', fontSize: '1rem' }}>Diamond Admin</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                <Calendar size={14} />
                <span>{blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Draft'}</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', cursor: 'pointer' }}><FiTwitter size={16} /></button>
            <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', cursor: 'pointer' }}><FiFacebook size={16} /></button>
            <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e5e7eb', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', cursor: 'pointer' }}><FiLinkedin size={16} /></button>
          </div>
        </div>
      </div>

      {blog.featured_image && (
        <div style={{ maxWidth: '1000px', margin: '0 auto 3rem auto', padding: '0 1.5rem' }}>
          <img 
            src={blog.featured_image} 
            alt={blog.title} 
            style={{ width: '100%', maxHeight: '600px', objectFit: 'cover', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }} 
          />
        </div>
      )}

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem 6rem 1.5rem' }}>
        <div 
          style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.8, 
            color: '#374151', 
            whiteSpace: 'pre-wrap',
            fontFamily: '"Merriweather", "Georgia", serif'
          }}
        >
          {blog.content}
        </div>
        
        {/* Footer tags/share */}
        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ backgroundColor: '#f3f4f6', color: '#4b5563', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>Pest Control</span>
            <span style={{ backgroundColor: '#f3f4f6', color: '#4b5563', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500 }}>Tips</span>
          </div>
          <button onClick={handleShare} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4f46e5', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            <Share2 size={18} /> Share Article
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem 6rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '2rem' }}>Comments ({comments.length})</h3>
        
        {/* Comment Form */}
        <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '3rem', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }}>Leave a Comment</h4>
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              value={newCommentName} 
              onChange={e => setNewCommentName(e.target.value)} 
              required 
              style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none', fontFamily: 'inherit' }}
            />
            <textarea 
              placeholder="Your Comment..." 
              value={newCommentText} 
              onChange={e => setNewCommentText(e.target.value)} 
              required 
              rows="3"
              style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
            />
            <button type="submit" disabled={submittingComment} style={{ alignSelf: 'flex-start', backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '0.375rem', fontWeight: 600, cursor: 'pointer', transition: 'background-color 0.2s' }}>
              {submittingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        </div>

        {/* Comment List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {comments.map(c => (
            <div key={c.comment_id} style={{ display: 'flex', gap: '1rem' }}>
               <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '50%', backgroundColor: '#e5e7eb', overflow: 'hidden' }}>
                 <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.author_name)}&background=f1f5f9&color=334155`} alt={c.author_name} style={{ width: '100%', height: '100%' }} />
               </div>
               <div style={{ flex: 1 }}>
                 <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                   <span style={{ fontWeight: 600, color: '#111827' }}>{c.author_name}</span>
                   <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{new Date(c.created_at).toLocaleDateString()}</span>
                 </div>
                 <p style={{ color: '#4b5563', margin: 0, lineHeight: 1.5 }}>{c.content}</p>
               </div>
            </div>
          ))}
          {comments.length === 0 && <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No comments yet. Be the first to share your thoughts!</p>}
        </div>
      </div>

    </div>
  );
};

export default BlogPost;
