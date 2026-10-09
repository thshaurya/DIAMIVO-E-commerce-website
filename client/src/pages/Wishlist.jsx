import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../services/api';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight } from 'react-icons/fi';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const loadWishlist = () => {
    try {
      const items = JSON.parse(localStorage.getItem('diamivo-wishlist')) || [];
      setWishlist(items);
    } catch (e) {
      setWishlist([]);
    }
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => (item._id || item.slug) !== id);
    setWishlist(updated);
    localStorage.setItem('diamivo-wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const moveToCart = (product) => {
    try {
      let cart = JSON.parse(localStorage.getItem('diamivo-cart')) || [];
      const prodId = product._id || product.slug;
      const existingIndex = cart.findIndex((item) => (item._id || item.slug) === prodId);

      if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
      } else {
        cart.push({
          _id: product._id,
          product: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          quantity: 1,
          images: product.images,
          image: product.images?.[0] || '',
          metal: product.metal,
          category: product.category
        });
      }

      localStorage.setItem('diamivo-cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));

      // Remove from wishlist
      removeFromWishlist(prodId);
    } catch (e) {}
  };

  if (wishlist.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '75vh', padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-silver-light)',
              color: 'var(--color-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <FiHeart />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Save your favorite solitaires, tennis bracelets, and diamond creations for future consideration.
          </p>
          <Link to="/shop" className="btn btn-gold btn-lg">
            Explore High Jewellery <FiArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '3rem 0 6rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-primary-dark)' }}>
            Personal Wishlist
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            {wishlist.length} {wishlist.length === 1 ? 'creation' : 'creations'} saved to your private curation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {wishlist.map((item) => {
            const itemId = item._id || item.slug;
            const img = item.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80';

            return (
              <div key={itemId} className="card" style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '260px', overflow: 'hidden', backgroundColor: 'var(--color-silver-light)' }}>
                  <Link to={`/product/${itemId}`}>
                    <img src={img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(itemId)}
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      backgroundColor: '#ffffff',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-danger)',
                      boxShadow: 'var(--shadow-sm)',
                      cursor: 'pointer'
                    }}
                    title="Remove from wishlist"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                      {item.category} • {item.metal}
                    </div>
                    <Link to={`/product/${itemId}`}>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: '0.25rem 0 0.5rem 0' }}>
                        {item.name}
                      </h4>
                    </Link>
                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-dark)', marginBottom: '1.25rem' }}>
                      {formatCurrency(item.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => moveToCart(item)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%' }}
                  >
                    <FiShoppingBag /> Move to Shopping Bag
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
