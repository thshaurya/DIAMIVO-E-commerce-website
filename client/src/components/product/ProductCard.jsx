import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingBag, FiCheck } from 'react-icons/fi';
import { formatCurrency } from '../../services/api';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const productId = product._id || product.slug;

  // Check wishlist state
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem('diamivo-wishlist')) || [];
      setIsWishlisted(wishlist.some((item) => (item._id || item.slug) === productId));
    } catch (e) {
      setIsWishlisted(false);
    }
  }, [productId]);

  // Wishlist toggle
  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let wishlist = JSON.parse(localStorage.getItem('diamivo-wishlist')) || [];
      const exists = wishlist.some((item) => (item._id || item.slug) === productId);

      if (exists) {
        wishlist = wishlist.filter((item) => (item._id || item.slug) !== productId);
        setIsWishlisted(false);
      } else {
        wishlist.push({
          _id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          category: product.category,
          images: product.images,
          metal: product.metal
        });
        setIsWishlisted(true);
      }

      localStorage.setItem('diamivo-wishlist', JSON.stringify(wishlist));
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
  };

  // Quick Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      let cart = JSON.parse(localStorage.getItem('diamivo-cart')) || [];
      const existingIndex = cart.findIndex((item) => (item._id || item.slug) === productId);

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

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80';

  return (
    <div
      className="card product-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        backgroundColor: '#ffffff'
      }}
    >
      {/* Product Image Frame */}
      <div
        style={{
          position: 'relative',
          paddingTop: '100%',
          overflow: 'hidden',
          backgroundColor: 'var(--color-silver-light)'
        }}
      >
        <Link to={`/product/${productId}`}>
          <img
            src={mainImage}
            alt={product.name}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="product-img-hover"
          />
        </Link>

        {/* Badges */}
        <div
          style={{
            position: 'absolute',
            top: '0.875rem',
            left: '0.875rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
            zIndex: 2
          }}
        >
          {product.isFeatured && (
            <span className="badge badge-gold">Signature</span>
          )}
          {product.isNewArrival && (
            <span className="badge badge-blue">New Edition</span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span
              className="badge"
              style={{
                backgroundColor: '#fef2f2',
                color: '#b91c1c',
                border: '1px solid #fecaca'
              }}
            >
              Special Price
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={toggleWishlist}
          style={{
            position: 'absolute',
            top: '0.875rem',
            right: '0.875rem',
            zIndex: 3,
            backgroundColor: '#ffffff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isWishlisted ? 'var(--color-danger)' : 'var(--color-primary)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
            transition: 'transform 0.2s ease, color 0.2s ease'
          }}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <FiHeart style={{ fill: isWishlisted ? 'var(--color-danger)' : 'none', fontSize: '1.1rem' }} />
        </button>
      </div>

      {/* Details Container */}
      <div
        style={{
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          {/* Category & Metal Tag */}
          <div
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-text-muted)',
              marginBottom: '0.375rem'
            }}
          >
            {product.category} • {product.metal}
          </div>

          {/* Product Title */}
          <Link to={`/product/${productId}`}>
            <h3
              style={{
                fontSize: '1.2rem',
                color: 'var(--color-primary-dark)',
                marginBottom: '0.5rem',
                fontWeight: 600,
                lineHeight: 1.3
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Short diamond/stone note */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.5
            }}
          >
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--color-border-subtle)',
            marginTop: 'auto'
          }}
        >
          <div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
              {formatCurrency(product.price)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div
                style={{
                  fontSize: '0.8125rem',
                  color: 'var(--color-text-subtle)',
                  textDecoration: 'line-through'
                }}
              >
                {formatCurrency(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn ${isAdded ? 'btn-primary' : 'btn-outline'} btn-sm`}
            style={{ padding: '0.5rem 0.875rem' }}
            title="Add to Shopping Bag"
          >
            {isAdded ? (
              <>
                <FiCheck /> Added
              </>
            ) : (
              <>
                <FiShoppingBag /> Add
              </>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .product-card:hover .product-img-hover {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
