import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { IoDiamondOutline } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logoutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const location = useLocation();

  // Listen to scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update counts from localStorage
  const updateCounts = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('diamivo-cart')) || [];
      const totalQty = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalQty);

      const wishlist = JSON.parse(localStorage.getItem('diamivo-wishlist')) || [];
      setWishlistCount(wishlist.length);
    } catch (e) {
      setCartCount(0);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('wishlistUpdated', updateCounts);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('wishlistUpdated', updateCounts);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop High Jewellery', path: '/shop' },
    { name: 'The 4Cs Diamonds', path: '/diamonds' },
    { name: 'Precious Gemstones', path: '/stones' },
    { name: 'Maison Story', path: '/about' },
    { name: 'Track Order', path: '/order-tracking' }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(10, 37, 64, 0.98)' : 'var(--color-primary)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(199, 164, 90, 0.25)',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.25)' : 'none'
        }}
      >
        {/* Top Mini Banner */}
        <div
          style={{
            backgroundColor: 'var(--color-primary-dark)',
            color: 'var(--color-silver)',
            textAlign: 'center',
            padding: '0.4rem 1rem',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <span>Complimentary Insured Delivery Across India on Orders Above ₹50,000</span>
        </div>

        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              display: 'none',
              padding: '0.5rem',
              cursor: 'pointer'
            }}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ffffff'
            }}
          >
            <IoDiamondOutline style={{ fontSize: '1.6rem', color: 'var(--color-gold)' }} />
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                letterSpacing: '0.2em',
                fontWeight: 600,
                color: '#ffffff'
              }}
            >
              DIAMIVO
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.75rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-gold)' : 'var(--color-silver-light)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: isActive ? 600 : 400,
                  position: 'relative',
                  padding: '0.5rem 0',
                  transition: 'color 0.2s ease'
                })}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Wishlist */}
            <Link
              to="/wishlist"
              style={{
                position: 'relative',
                color: '#ffffff',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                padding: '0.25rem'
              }}
              title="View Wishlist"
            >
              <FiHeart />
              {wishlistCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: 'var(--color-gold)',
                    color: '#061827',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag */}
            <Link
              to="/cart"
              style={{
                position: 'relative',
                color: '#ffffff',
                fontSize: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                padding: '0.25rem'
              }}
              title="View Shopping Bag"
            >
              <FiShoppingBag />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: 'var(--color-gold)',
                    color: '#061827',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Account Button */}
            {isAuthenticated && user ? (
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
                title="Client Sanctuary Profile"
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(199, 164, 90, 0.2)',
                    border: '1px solid var(--color-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-gold)',
                    fontSize: '0.9rem'
                  }}
                >
                  <FiUser />
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 500 }} className="desktop-username">
                  {user.name ? user.name.split(' ')[0] : 'Client'}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn btn-outline-gold btn-sm"
                style={{
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em'
                }}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '108px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--color-primary-dark)',
            zIndex: 999,
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            borderTop: '1px solid rgba(199, 164, 90, 0.2)'
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-gold)' : '#ffffff',
                fontSize: '1.1rem',
                fontFamily: 'var(--font-serif)',
                letterSpacing: '0.05em',
                padding: '0.4rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              })}
            >
              {link.name}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/profile" style={{ color: 'var(--color-gold)', fontSize: '1rem' }}>
                Signed in as {user?.name}
              </Link>
              <button onClick={logoutUser} style={{ color: 'var(--color-danger)', fontSize: '0.85rem' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-gold btn-sm" style={{ marginTop: '1rem' }}>
              Sign In to Sanctuary
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .desktop-username { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
