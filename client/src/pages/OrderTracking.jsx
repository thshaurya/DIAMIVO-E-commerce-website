import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrderByNumber, cancelOrder, formatCurrency } from '../services/api';
import SectionHeading from '../components/common/SectionHeading';
import { FiSearch, FiCheck, FiTruck, FiBox, FiClock, FiAlertCircle } from 'react-icons/fi';

const statusSteps = [
  { key: 'confirmed', label: 'Order Confirmed', icon: FiCheck },
  { key: 'processing', label: 'Vault Preparation', icon: FiBox },
  { key: 'shipped', label: 'In Armored Transit', icon: FiTruck },
  { key: 'delivered', label: 'Delivered', icon: FiCheck }
];

const OrderTracking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrderNumber = searchParams.get('orderNumber') || '';

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cancelSuccess, setCancelSuccess] = useState('');

  const fetchOrder = async (number) => {
    if (!number.trim()) return;
    setError('');
    setCancelSuccess('');
    setLoading(true);

    try {
      const res = await getOrderByNumber(number.trim());
      if (res.data) {
        setOrder(res.data);
      } else {
        setError(`No order found matching "${number}".`);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        `Unable to find order "${number}". Please verify your order number and try again.`
      );
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber) {
      fetchOrder(initialOrderNumber);
    }
  }, [initialOrderNumber]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setSearchParams({ orderNumber: orderNumber.trim() });
    fetchOrder(orderNumber);
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you certain you wish to cancel this order? Stock will be restored to atelier inventory.')) {
      return;
    }

    try {
      const res = await cancelOrder(order._id);
      if (res.data) {
        setOrder(res.data);
        setCancelSuccess('Order successfully cancelled. Inventory restored to atelier.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error cancelling order');
    }
  };

  const getStepIndex = (status) => {
    if (status === 'delivered') return 3;
    if (status === 'shipped') return 2;
    if (status === 'processing') return 1;
    return 0; // pending or confirmed
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          padding: '4.5rem 0 3.5rem 0',
          borderBottom: '1px solid rgba(199, 164, 90, 0.2)'
        }}
      >
        <div className="container">
          <SectionHeading
            eyebrow="Consignment Logistics"
            title="Armored Transit & Order Tracking"
            subtitle="Track the real-time preparation, gemological verification, and insured courier delivery of your commissions."
            light={true}
          />
        </div>
      </div>

      <div className="container" style={{ maxWidth: '850px', marginTop: '3.5rem' }}>
        {/* Search Bar */}
        <div
          className="card"
          style={{
            padding: '2rem',
            backgroundColor: '#ffffff',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '3rem'
          }}
        >
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flexGrow: 1, position: 'relative', minWidth: '260px' }}>
              <FiSearch
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }}
              />
              <input
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter Tracking Number (e.g. DMV-123456-7890)"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem', textTransform: 'uppercase' }}
              />
            </div>
            <button type="submit" disabled={loading} className="btn btn-gold">
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: '1.25rem', color: '#b91c1c', backgroundColor: '#fef2f2', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiAlertCircle /> {error}
            </div>
          )}

          {cancelSuccess && (
            <div style={{ marginTop: '1.25rem', color: '#065f46', backgroundColor: '#ecfdf5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiCheck /> {cancelSuccess}
            </div>
          )}
        </div>

        {/* Order Details Display */}
        {order && (
          <div className="card" style={{ padding: '2.5rem', backgroundColor: '#ffffff', boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--color-border-subtle)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '0.375rem' }}>
                  Status: {order.orderStatus.toUpperCase()}
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary-dark)' }}>
                  Order {order.orderNumber}
                </h3>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              {order.orderStatus !== 'cancelled' && order.orderStatus !== 'delivered' && (
                <button
                  onClick={handleCancel}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
                >
                  Cancel Order
                </button>
              )}
            </div>

            {/* Stepper (Unless cancelled) */}
            {order.orderStatus === 'cancelled' ? (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '1.25rem', borderRadius: 'var(--radius-sm)', color: '#991b1b', marginBottom: '2.5rem', textAlign: 'center' }}>
                <strong>Consignment Cancelled</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  This commission was cancelled. Allocated diamonds and precious metals have been returned to active inventory.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem', textAlign: 'center' }}>
                {statusSteps.map((step, idx) => {
                  const currentIdx = getStepIndex(order.orderStatus);
                  const isCompleted = idx <= currentIdx;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--color-silver-light)',
                          color: isCompleted ? 'var(--color-gold)' : 'var(--color-text-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem',
                          marginBottom: '0.5rem',
                          border: isCompleted ? '2px solid var(--color-gold)' : '1px solid var(--color-border)'
                        }}
                      >
                        <Icon />
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: isCompleted ? 600 : 400, color: isCompleted ? 'var(--color-primary-dark)' : 'var(--color-text-muted)' }}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Items Summary */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                Commissioned Items
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Payment Meta */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', backgroundColor: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--color-primary)' }}>Shipping Destination:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  {order.shippingAddress?.name}<br />
                  {order.shippingAddress?.address}<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--color-primary)' }}>Payment Terms:</strong>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem', textTransform: 'uppercase' }}>
                  Method: {order.paymentMethod}<br />
                  Payment Status: {order.paymentStatus}<br />
                  Total Insured: {formatCurrency(order.totalPrice)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
