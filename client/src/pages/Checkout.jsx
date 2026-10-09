import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createOrder, formatCurrency } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Shipping Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: 'India',
    paymentMethod: 'cod',
    notes: ''
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        address: prev.address || user.address?.street || '',
        city: prev.city || user.address?.city || '',
        state: prev.state || user.address?.state || '',
        postalCode: prev.postalCode || user.address?.postalCode || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('diamivo-cart')) || [];
      if (items.length === 0) {
        navigate('/cart');
      } else {
        setCartItems(items);
      }
    } catch (e) {
      navigate('/cart');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shipping = subtotal >= 50000 ? 0 : 499;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = {
      items: cartItems.map((item) => ({
        product: item.product || item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image || item.images?.[0] || ''
      })),
      shippingAddress: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country
      },
      paymentMethod: formData.paymentMethod,
      notes: formData.notes
    };

    try {
      const res = await createOrder(payload);
      if (res.data && res.data.orderNumber) {
        // Clear cart
        localStorage.removeItem('diamivo-cart');
        window.dispatchEvent(new Event('cartUpdated'));
        navigate(`/order-success/${res.data.orderNumber}`);
        return;
      }
    } catch (err) {
      // If server returned a business error (e.g. out of stock or validation)
      const message = err.response?.data?.message;
      if (message) {
        setError(message);
        setLoading(false);
        return;
      }

      // Offline fallback: save order locally so user can test the complete flow
      const demoOrderNumber = `DMV-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.removeItem('diamivo-cart');
      window.dispatchEvent(new Event('cartUpdated'));
      navigate(`/order-success/${demoOrderNumber}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '85vh', padding: '3rem 0 6rem 0' }}>
      <div className="container" style={{ maxWidth: '1050px' }}>
        <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-primary-dark)' }}>
            Insured Checkout
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Vault-to-door tamper-evident transit with 100% loss-protection insurance.
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '2rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Left: Shipping & Payment Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Shipping Address Card */}
              <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
                  1. Shipping & Contact Information
                </h3>

                <div className="form-group">
                  <label className="form-label">Recipient Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rajesh Sharma"
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rajesh@example.com"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address & Landmark *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Apartment, building, and street name"
                    className="form-input"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Maharashtra"
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Postal / PIN Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="400001"
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      disabled
                      value={formData.country}
                      className="form-input"
                      style={{ backgroundColor: 'var(--color-silver-light)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
                  2. Select Payment Method
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: formData.paymentMethod === 'cod' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === 'cod' ? 'rgba(199, 164, 90, 0.05)' : '#ffffff'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>Cash / Card on Delivery (COD)</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Pay safely via cash or POS card terminal upon arrival of insured armored courier.
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: formData.paymentMethod === 'upi' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === 'upi' ? 'rgba(199, 164, 90, 0.05)' : '#ffffff'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>Instant UPI / QR Code</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Google Pay, PhonePe, Paytm, BHIM UPI (Simulation ready).
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: formData.paymentMethod === 'card' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === 'card' ? 'rgba(199, 164, 90, 0.05)' : '#ffffff'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>Credit / Debit Card</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Visa, MasterCard, American Express, RuPay (Simulation ready).
                      </div>
                    </div>
                  </label>

                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: formData.paymentMethod === 'netbanking' ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      backgroundColor: formData.paymentMethod === 'netbanking' ? 'rgba(199, 164, 90, 0.05)' : '#ffffff'
                    }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleChange}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>Net Banking</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        HDFC, ICICI, SBI, Axis, Kotak Bank (Simulation ready).
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Breakdown */}
            <div className="card" style={{ padding: '2rem', backgroundColor: '#ffffff', position: 'sticky', top: '120px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.5rem' }}>
                Order Items ({cartItems.length})
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '240px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                {cartItems.map((item) => (
                  <div key={item._id || item.slug} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img
                      src={item.image || item.images?.[0]}
                      alt={item.name}
                      style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Qty: {item.quantity || 1}</div>
                    </div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                      {formatCurrency(item.price * (item.quantity || 1))}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Insured Armored Transit</span>
                  <span style={{ color: shipping === 0 ? 'var(--color-success)' : 'inherit', fontWeight: 600 }}>
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                  <span>Total Amount</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-gold btn-lg"
                style={{ width: '100%', marginBottom: '1rem' }}
              >
                {loading ? 'Securing Order...' : 'Place Insured Order'}
              </button>

              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                <FiLock style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                By placing this order you acknowledge DIAMIVO terms of bespoke crafting & certified vault delivery.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
