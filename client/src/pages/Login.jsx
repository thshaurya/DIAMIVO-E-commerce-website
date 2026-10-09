import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiMail, FiLock, FiAlertCircle, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await loginUser(email, password);
    if (res.success) {
      navigate(redirect);
    } else {
      setError(res.message);
    }
  };

  // Quick fill helper for demo/portfolio presentations
  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setEmail('admin@diamivo.com');
      setPassword('Admin@123');
    } else {
      setEmail('aarav@example.com');
      setPassword('Customer@123');
    }
    setError('');
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '2.5rem',
          backgroundColor: '#ffffff',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <IoDiamondOutline style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '0.5rem' }} />
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
            Client Sanctuary
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Sign in to access your bespoke orders, wishlist, and private consultations.
          </p>
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}
          >
            <FiAlertCircle style={{ flexShrink: 0 }} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="connoisseur@diamivo.com"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="form-input"
                style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  background: 'none',
                  border: 'none'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff style={{ fontSize: '1.1rem' }} /> : <FiEye style={{ fontSize: '1.1rem' }} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gold btn-lg"
            style={{ width: '100%', marginBottom: '1.5rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'} <FiArrowRight />
          </button>
        </form>

        {/* Demo Credentials Quick Switcher (BTech Viva Friendly) */}
        <div style={{ backgroundColor: 'var(--color-silver-light)', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.8125rem', textAlign: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 500 }}>
            Demo Portfolio Quick-Fill:
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => fillDemoCredentials('customer')}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => fillDemoCredentials('admin')}
              className="btn btn-outline-gold btn-sm"
              style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
            >
              Atelier Admin
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          New to DIAMIVO?{' '}
          <Link to={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`} style={{ color: 'var(--color-gold-dark)', fontWeight: 600 }}>
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
