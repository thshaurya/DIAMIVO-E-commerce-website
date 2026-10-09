import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import SectionHeading from '../components/common/SectionHeading';
import { FiUser, FiMail, FiPhone, FiMapPin, FiShield, FiCheck, FiLogOut, FiPackage, FiHeart } from 'react-icons/fi';

const Profile = () => {
  const navigate = useNavigate();
  const { user, token, logoutUser, updateUser } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        postalCode: user.address?.postalCode || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: 'India'
        }
      });

      if (res.data) {
        updateUser(res.data);
        setMessage('Profile updated successfully.');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '3.5rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '0.375rem' }}>
              {user.role === 'admin' ? 'Atelier Director' : 'Verified Client'}
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-primary-dark)' }}>
              {user.name}’s Sanctuary
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
              {user.email}
            </p>
          </div>

          <button onClick={handleLogout} className="btn btn-outline btn-sm" style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
            <FiLogOut /> Sign Out
          </button>
        </div>

        {/* Quick Hub Links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          <Link to="/order-tracking" className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'var(--color-blue-soft)', color: 'var(--color-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              <FiPackage />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Order Tracking</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Check courier status</div>
            </div>
          </Link>

          <Link to="/wishlist" className="card" style={{ padding: '1.25rem', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(199, 164, 90, 0.15)', color: 'var(--color-gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
              <FiHeart />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Curated Wishlist</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Saved diamond pieces</div>
            </div>
          </Link>
        </div>

        {/* Profile Details Edit Card */}
        <div className="card" style={{ padding: '2.5rem', backgroundColor: '#ffffff', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
            Personal Dossier & Default Shipping Destination
          </h3>

          {message && (
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <FiCheck /> {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address (Immutable)</label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="form-input"
                  style={{ backgroundColor: 'var(--color-silver-light)' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Direct Contact Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98200 12345"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Street Address & Landmark</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Apartment, building, and street name"
                className="form-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Maharashtra"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Postal / PIN Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="400001"
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-gold">
              {loading ? 'Saving Changes...' : 'Update Dossier'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
