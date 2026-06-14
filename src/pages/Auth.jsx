import React, { useState } from 'react';
import { Mail, Phone, Lock, User as UserIcon } from 'lucide-react';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

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

        <form className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label><UserIcon size={16} /> Full Name</label>
              <input type="text" className="form-control" placeholder="John Doe" />
            </div>
          )}
          
          <div className="form-group">
            <label><Mail size={16} /> Email Address or Phone</label>
            <input type="text" className="form-control" placeholder="john@example.com or +1 234..." />
          </div>

          <div className="form-group">
            <label><Lock size={16} /> Password</label>
            <input type="password" className="form-control" placeholder="••••••••" />
          </div>

          <button type="button" className="btn btn-primary auth-submit">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <div className="social-login">
          <button className="btn social-btn google-btn">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
