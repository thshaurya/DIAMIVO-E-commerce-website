import React from 'react';
import { Link } from 'react-router-dom';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiArrowRight } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '540px' }}>
        <IoDiamondOutline style={{ fontSize: '3.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }} />
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', color: 'var(--color-primary-dark)', lineHeight: 1 }}>
          404
        </h1>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          Page Not Found in Atelier
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          The high jewellery catalogue page or resource you are looking for may have been relocated or is no longer available.
        </p>
        <Link to="/" className="btn btn-gold btn-lg">
          Return to Sanctuary <FiArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
