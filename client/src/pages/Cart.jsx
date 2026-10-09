import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../services/api';
import { FiTrash2, FiShoppingBag, FiArrowRight, FiShield, FiTruck } from 'react-icons/fi';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart from localStorage
  const loadCart = () => {
    try {
      const items = JSON.parse(localStorage.getItem('diamivo-cart')) || [];
      setCartItems(items);
    } catch (e) {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, []);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map((item) => {
      if ((item._id || item.slug) === id) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem('diamivo-cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => (item._id || item.slug) !== id);
    setCartItems(updated);
    localStorage.setItem('diamivo-cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('diamivo-cart');
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const freeShippingThreshold = 50000;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 499;
  const total = subtotal + shipping;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  if (cartItems.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '75vh', padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-silver-light)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <FiShoppingBag />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.25rem', color: 'var(--color-primary-dark)', marginBottom: '0.75rem' }}>
            Your Shopping Bag is Empty
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Discover our collection of certified diamond solitaires, tennis necklaces, and handcrafted jewellery.
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-primary-dark)' }}>
              Shopping Bag
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Review your selected creations before proceeding to insured checkout.
            </p>
          </div>
          <button
            onClick={clearCart}
            style={{ fontSize: '0.85rem', color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}
          >
            <FiTrash2 /> Empty Bag
          </button>
        </div>

        {/* Free Shipping Tier Notice */}
        <div
          style={{
            backgroundColor: subtotal >= freeShippingThreshold ? '#ecfdf5' : 'var(--color-blue-soft)',
            border: `1px solid ${subtotal >= freeShippingThreshold ? '#a7f3d0' : 'rgba(30, 95, 145, 0.2)'}`,
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.9rem',
            color: subtotal >= freeShippingThreshold ? '#065f46' : 'var(--color-blue)'
          }}
        >
          <FiTruck style={{ fontSize: '1.25rem' }} />
          {subtotal >= freeShippingThreshold ? (
            <span><strong>Complimentary Insured Vault Delivery:</strong> Your order qualifies for free armored transit!</span>
          ) : (
            <span>
              Add <strong>{formatCurrency(amountNeededForFreeShipping)}</strong> more to your bag to receive <strong>Complimentary Insured Vault Delivery</strong>!
            </span>
          )}
        </div>

        {/* Cart Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Item List Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map((item) => {
              const itemId = item._id || item.slug;
              const img = item.images?.[0] || item.image || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80';

              return (
                <div
                  key={itemId}
                  className="card"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '1.5rem',
                    gap: '1.5rem',
                    backgroundColor: '#ffffff',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={img}
                    alt={item.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-silver-light)' }}
                  />

                  <div style={{ flexGrow: 1, minWidth: '180px' }}>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                      {item.category} • {item.metal}
                    </div>
                    <Link to={`/product/${itemId}`}>
                      <h4 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)', margin: '0.25rem 0' }}>
                        {item.name}
                      </h4>
                    </Link>
                    <div style={{ fontWeight: 700, color: 'var(--color-primary-dark)', fontSize: '1.05rem' }}>
                      {formatCurrency(item.price)}
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                    <button
                      onClick={() => updateQuantity(itemId, (item.quantity || 1) - 1)}
                      style={{ padding: '0.5rem 0.85rem', color: 'var(--color-text)' }}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span style={{ padding: '0.5rem 0.85rem', fontWeight: 600, minWidth: '32px', textAlign: 'center' }}>
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => updateQuantity(itemId, (item.quantity || 1) + 1)}
                      style={{ padding: '0.5rem 0.85rem', color: 'var(--color-text)' }}
                    >
                      +
                    </button>
                  </div>

                  {/* Total item price */}
                  <div style={{ minWidth: '100px', textAlign: 'right', fontWeight: 700, fontSize: '1.1rem' }}>
                    {formatCurrency(item.price * (item.quantity || 1))}
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(itemId)}
                    style={{ color: 'var(--color-text-subtle)', padding: '0.5rem', cursor: 'pointer', transition: 'color 0.2s' }}
                    title="Remove item"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary Column */}
          <div
            className="card"
            style={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              position: 'sticky',
              top: '120px'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '0.75rem' }}>
              Order Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)</span>
                <span style={{ fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Insured Armored Shipping</span>
                <span style={{ fontWeight: 600, color: shipping === 0 ? 'var(--color-success)' : 'inherit' }}>
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Applicable Taxes</span>
                <span style={{ color: 'var(--color-text-muted)' }}>Included</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                <span>Estimated Total</span>
                <span style={{ color: 'var(--color-primary-dark)' }}>{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-gold btn-lg"
              style={{ width: '100%', marginBottom: '1.25rem' }}
            >
              Proceed to Checkout <FiArrowRight />
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem' }}>
                <FiShield style={{ color: 'var(--color-gold)' }} />
                <span>256-Bit SSL Encrypted & Insured Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
