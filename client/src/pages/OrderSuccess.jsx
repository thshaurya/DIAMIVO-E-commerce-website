import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiCheckCircle, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
        <div
          className="card"
          style={{
            padding: '3.5rem 2.5rem',
            backgroundColor: '#ffffff',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Success Check Icon */}
          <div
            style={{
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <FiCheckCircle />
          </div>

          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>
            Confirmed & Verified
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              color: 'var(--color-primary-dark)',
              marginBottom: '1rem'
            }}
          >
            Thank You for Your Order
          </h1>

          <p style={{ color: 'var(--color-text)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Your high jewellery commission has been successfully logged with the DIAMIVO master atelier. Our gemologists have initiated physical inspection and vault packaging.
          </p>

          {/* Tracking Number Box */}
          <div
            style={{
              backgroundColor: 'var(--color-primary-dark)',
              color: '#ffffff',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '2.5rem',
              border: '1px solid rgba(199, 164, 90, 0.3)'
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--color-silver)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
              Your Official Tracking Number
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-gold-light)', fontWeight: 600, letterSpacing: '0.05em' }}>
              {id || 'DMV-CONFIRMED'}
            </div>
          </div>

          {/* Delivery & Security Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'left', marginBottom: '2.5rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <FiTruck style={{ color: 'var(--color-gold)', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Insured Armored Courier:</strong>
                <p style={{ color: 'var(--color-text-muted)' }}>Estimated delivery within 3–5 business days.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <FiShield style={{ color: 'var(--color-gold)', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Laboratory Dossier:</strong>
                <p style={{ color: 'var(--color-text-muted)' }}>GIA/IGI laminated dossier included inside.</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={`/order-tracking?orderNumber=${id}`} className="btn btn-gold btn-lg">
              Track Order Status <FiArrowRight />
            </Link>
            <Link to="/shop" className="btn btn-outline btn-lg">
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
