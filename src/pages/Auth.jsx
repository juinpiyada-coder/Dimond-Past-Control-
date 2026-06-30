import React, { useState, useEffect } from 'react';
import { Mail, Phone, Lock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../utils/api';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [freezeTimeLeft, setFreezeTimeLeft] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load attempts from local storage to persist across reloads
    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      setAttempts(parseInt(storedAttempts, 10));
    }

    // Check freeze status
    const storedFreezeUntil = localStorage.getItem('loginFreezeUntil');
    if (storedFreezeUntil) {
      const freezeUntil = parseInt(storedFreezeUntil, 10);
      if (Date.now() < freezeUntil) {
        setFreezeTimeLeft(Math.ceil((freezeUntil - Date.now()) / 1000));
      } else {
        // Freeze is over, reset
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginFreezeUntil');
        setAttempts(0);
      }
    }
  }, []);

  // Timer effect for freeze countdown
  useEffect(() => {
    let timer;
    if (freezeTimeLeft > 0) {
      timer = setInterval(() => {
        setFreezeTimeLeft((prev) => {
          if (prev <= 1) {
            // Unfreeze when timer reaches 0
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('loginFreezeUntil');
            setAttempts(0);
            setError('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [freezeTimeLeft]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');

    if (freezeTimeLeft > 0) {
      setError(`Maximum login attempts reached. Please try again in ${freezeTimeLeft} seconds.`);
      return;
    }

    if (isLogin) {
      setLoading(true);
      try {
        const response = await apiCall('/login', 'POST', { email, password });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('loginAttempts', '0'); // Reset attempts on success
        localStorage.removeItem('loginFreezeUntil');
        if (response.user.role.includes('ADMIN')) {
          window.location.href = '/dashboard';
        } else {
          window.location.href = '/user-dashboard';
        }
      } catch (err) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        if (newAttempts >= 5) {
          const freezeUntil = Date.now() + 60 * 1000; // 1 minute
          localStorage.setItem('loginFreezeUntil', freezeUntil.toString());
          setFreezeTimeLeft(60);
          setError('Maximum login attempts reached. Please try again in 60 seconds.');
        } else {
          setError(err.message || 'Login failed');
        }
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        const response = await apiCall('/signup', 'POST', { 
            full_name: fullName, 
            email: email, 
            phone: phone, 
            password: password 
        });
        
        setError('');
        alert('Signup successful! Please login.');
        setIsLogin(true);
      } catch (err) {
        setError(err.message || 'Signup failed');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      
      const response = await apiCall('/google-auth', 'POST', {
        uid: fbUser.uid,
        email: fbUser.email,
        full_name: fbUser.displayName || 'Google User'
      });
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('loginAttempts', '0');
      localStorage.removeItem('loginFreezeUntil');
      
      if (response.user.role.includes('ADMIN')) {
        window.location.href = '/dashboard';
      } else {
        window.location.href = '/user-dashboard';
      }
    } catch (err) {
      setError(err.message || 'Google Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
          <p>{isLogin ? 'Login to manage your bookings' : 'Sign up for fast and easy pest control'}</p>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
        {attempts > 0 && isLogin && attempts < 5 && <div style={{ color: 'orange', marginBottom: '15px', textAlign: 'center' }}>Failed attempts: {attempts}/5</div>}
        {freezeTimeLeft > 0 && isLogin && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>Account frozen. Try again in {freezeTimeLeft}s</div>}

        <form className="auth-form" onSubmit={handleAuth}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label><UserIcon size={16} /> Full Name</label>
                <input type="text" required className="form-control" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={freezeTimeLeft > 0} />
              </div>
              <div className="form-group">
                <label><Phone size={16} /> Phone Number</label>
                <input type="tel" required className="form-control" placeholder="1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={freezeTimeLeft > 0} />
              </div>
            </>
          )}
          
          <div className="form-group">
            <label><Mail size={16} /> Email Address</label>
            <input type="email" required className="form-control" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={freezeTimeLeft > 0} />
          </div>

          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input type="password" required className="form-control" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={freezeTimeLeft > 0} />
          </div>

          <button type="submit" className="btn btn-primary auth-submit" disabled={loading || freezeTimeLeft > 0}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button type="button" className="btn social-btn google-btn" disabled={freezeTimeLeft > 0 || loading} onClick={handleGoogleLogin}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
