import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiArrowRight, FiShield } from 'react-icons/fi';

const Hero = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #061827 0%, #0a2540 60%, #123e63 100%)',
        color: '#ffffff',
        overflow: 'hidden',
        padding: '5rem 0'
      }}
    >
      {/* Decorative Shimmering Diamond Grid Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(199, 164, 90, 0.15) 0%, rgba(10, 37, 64, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(30, 95, 145, 0.25) 0%, rgba(10, 37, 64, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}
        >
          {/* Left Hero Editorial Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(199, 164, 90, 0.12)',
                border: '1px solid rgba(199, 164, 90, 0.3)',
                padding: '0.4rem 0.875rem',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1.75rem',
                color: 'var(--color-gold)'
              }}
            >
              <IoDiamondOutline />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Haute Joaillerie & Rare Gemology
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 400,
                lineHeight: 1.15,
                color: '#ffffff',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em'
              }}
            >
              Exceptional Diamonds. <br />
              <span style={{ fontStyle: 'italic', color: 'var(--color-gold-light)' }}>
                Timeless Precision.
              </span>
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--color-silver-light)',
                lineHeight: 1.7,
                maxWidth: '540px',
                marginBottom: '2.5rem'
              }}
            >
              Explore handcrafted diamond rings, tennis necklaces, and bespoke gemstone creations certified by GIA. Designed with mathematical brilliance and noble metals.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
              <Link to="/shop" className="btn btn-gold btn-lg">
                Explore The Collection <FiArrowRight />
              </Link>
              <Link to="/diamonds" className="btn btn-outline-gold btn-lg" style={{ borderColor: 'rgba(199, 164, 90, 0.6)' }}>
                The 4Cs Masterclass
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                marginTop: '3.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-silver)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  GIA / IGI Certified
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                  18K & PT950
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-silver)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Hallmarked Metals
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                  ₹50k+
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-silver)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Free Insured Transit
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                borderRadius: 'var(--radius-lg)',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(199, 164, 90, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
                alt="Aurora Diamond Ring Luxury Showcase"
                style={{
                  width: '100%',
                  height: '480px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)'
                }}
              />

              {/* Floating Highlight Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  right: '24px',
                  backgroundColor: 'rgba(6, 24, 39, 0.88)',
                  backdropFilter: 'blur(12px)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(199, 164, 90, 0.25)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Signature Masterpiece
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#ffffff' }}>
                    Aurora Diamond Solitaire Ring
                  </div>
                </div>
                <Link to="/shop" style={{ color: 'var(--color-gold)', fontSize: '1.25rem' }}>
                  <FiArrowRight />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
