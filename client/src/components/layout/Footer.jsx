import React from 'react';
import { Link } from 'react-router-dom';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiShield, FiAward, FiTruck, FiRefreshCw } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--color-primary-dark)', color: '#ffffff', borderTop: '1px solid rgba(199, 164, 90, 0.2)' }}>
      {/* Trust & Craftsmanship Pillars */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '3.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-gold)' }}><IoDiamondOutline /></div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', letterSpacing: '0.05em' }}>Ethically Sourced & Certified</h4>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.875rem', maxWidth: '280px' }}>
              100% Conflict-free natural diamonds graded by GIA and IGI international gemological laboratories.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-gold)' }}><FiShield /></div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', letterSpacing: '0.05em' }}>Lifetime Authenticity Guarantee</h4>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.875rem', maxWidth: '280px' }}>
              Every creation comes with laser inscription and hallmarked certificates of noble metal purity.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-gold)' }}><FiTruck /></div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', letterSpacing: '0.05em' }}>Insured Vault Transit</h4>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.875rem', maxWidth: '280px' }}>
              Discreet armored logistics and tamper-evident packaging straight to your doorstep.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-gold)' }}><FiRefreshCw /></div>
            <h4 style={{ color: '#ffffff', fontSize: '1.1rem', letterSpacing: '0.05em' }}>Bespoke Craftsmanship</h4>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.875rem', maxWidth: '280px' }}>
              Custom solitaire selection and complimentary ring sizing services with master jewellers.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '4rem 1.5rem 3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <IoDiamondOutline style={{ fontSize: '1.75rem', color: 'var(--color-gold)' }} />
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', letterSpacing: '0.2em', fontWeight: 600 }}>DIAMIVO</span>
            </div>
            <p style={{ color: 'var(--color-silver)', fontSize: '0.875rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Haute joaillerie atelier dedicated to the artistry of exceptional diamonds, timeless proportions, and gemstone heritage.
            </p>
            <div style={{ color: 'var(--color-gold)', fontSize: '0.8125rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Mumbai • New Delhi • London
            </div>
          </div>

          {/* Jewellery Collections */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Collections
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-silver)' }}>
              <li><Link to="/shop?category=rings" style={{ color: 'inherit' }}>Solitaire & Halo Rings</Link></li>
              <li><Link to="/shop?category=necklaces" style={{ color: 'inherit' }}>Diamond Tennis Necklaces</Link></li>
              <li><Link to="/shop?category=earrings" style={{ color: 'inherit' }}>Brilliant Studs & Drops</Link></li>
              <li><Link to="/shop?category=bracelets" style={{ color: 'inherit' }}>Articulated Tennis Bracelets</Link></li>
              <li><Link to="/shop" style={{ color: 'var(--color-gold)' }}>View All High Jewellery →</Link></li>
            </ul>
          </div>

          {/* Education & Guides */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Gemology & Education
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-silver)' }}>
              <li><Link to="/diamonds" style={{ color: 'inherit' }}>The 4Cs Diamond Masterclass</Link></li>
              <li><Link to="/stones" style={{ color: 'inherit' }}>Precious Colored Gemstones</Link></li>
              <li><Link to="/diamonds#carat" style={{ color: 'inherit' }}>Carat Weight & Visual Spread</Link></li>
              <li><Link to="/diamonds#cut" style={{ color: 'inherit' }}>Cut Precision & Scintillation</Link></li>
              <li><Link to="/about" style={{ color: 'inherit' }}>About Our Atelier</Link></li>
            </ul>
          </div>

          {/* Concierge & Orders */}
          <div>
            <h5 style={{ color: '#ffffff', fontSize: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Client Concierge
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-silver)' }}>
              <li><Link to="/order-tracking" style={{ color: 'inherit' }}>Track Your Order</Link></li>
              <li><Link to="/cart" style={{ color: 'inherit' }}>Shopping Bag</Link></li>
              <li><Link to="/wishlist" style={{ color: 'inherit' }}>Personal Wishlist</Link></li>
              <li style={{ color: 'var(--color-silver)', marginTop: '0.5rem' }}>
                Atelier Assistance: <br />
                <span style={{ color: 'var(--color-gold)' }}>concierge@diamivo.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: 'var(--color-silver)' }}>
          <p>© {new Date().getFullYear()} DIAMIVO Haute Joaillerie. All rights reserved.</p>
          <p style={{ display: 'flex', gap: '1.5rem' }}>
            <span>BTech Portfolio Project</span>
            <span>•</span>
            <span>MongoDB • Express • React • Node</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
