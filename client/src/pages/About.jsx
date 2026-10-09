import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiAward, FiShield, FiHeart, FiCheck } from 'react-icons/fi';

const About = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Editorial Header */}
      <div
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          padding: '5rem 0 4rem 0',
          borderBottom: '1px solid rgba(199, 164, 90, 0.2)'
        }}
      >
        <div className="container">
          <SectionHeading
            eyebrow="The Atelier Heritage"
            title="The Story Behind DIAMIVO"
            subtitle="Bridging architectural geometry, exceptional diamond rarity, and transparent gemological education."
            light={true}
          />
        </div>
      </div>

      <div className="container" style={{ marginTop: '4rem' }}>
        {/* Story Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '5rem'
          }}
        >
          <div>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>Maison Philosophy</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-primary-dark)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Where Mathematical Symmetry Meets Earth’s Rare Treasures
            </h2>
            <p style={{ color: 'var(--color-text)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              DIAMIVO was established with a singular conviction: luxury jewellery should be as intellectually transparent as it is aesthetically intoxicating. For centuries, the high jewellery world shielded gemological grading behind opaque terminology.
            </p>
            <p style={{ color: 'var(--color-text)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Our atelier empowers connoisseurs with comprehensive educational tools—from interactive carat simulators to spectral clarity breakdowns—ensuring every diamond acquired represents uncompromised optical fire and lifelong emotional resonance.
            </p>

            <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-gold-dark)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Conflict-Free Origin
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-gold-dark)' }}>
                  0.05%
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Top Tier Selection
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-gold-dark)' }}>
                  GIA
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Laboratory Standards
                </div>
              </div>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80"
              alt="Atelier diamond setting artistry"
              style={{
                width: '100%',
                height: '480px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
          </div>
        </div>

        {/* Pillars of DIAMIVO */}
        <div style={{ marginBottom: '5rem' }}>
          <SectionHeading
            eyebrow="Commitments"
            title="Our Four Cornerstones"
            subtitle="The uncompromising standards guiding every solitaire mounted in our workshops."
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ padding: '2.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }}><IoDiamondOutline /></div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Optimal Cut Proportions</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                We refuse steep-crown or deep-pavilion diamonds that disguise weight. Every DIAMIVO stone is cut to maximize light return.
              </p>
            </div>

            <div className="card" style={{ padding: '2.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }}><FiAward /></div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Noble Metals Only</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Crafted solely in 18-karat white, yellow, or rose gold, alongside 950-purity platinum, hallmarked for chemical longevity.
              </p>
            </div>

            <div className="card" style={{ padding: '2.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }}><FiShield /></div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Ethical Verification</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Adherence to the Kimberley Process and responsible sourcing covenants safeguarding environmental and mining communities.
              </p>
            </div>

            <div className="card" style={{ padding: '2.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }}><FiHeart /></div>
              <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Lifelong Care</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Complimentary annual prong inspection, sonic steam cleansing, and certificate re-verification across our atelier network.
              </p>
            </div>
          </div>
        </div>

        {/* Project Context & Viva Note for Portfolio Reviewers */}
        <div
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#ffffff',
            padding: '3rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(199, 164, 90, 0.3)'
          }}
        >
          <span className="badge badge-gold" style={{ marginBottom: '0.75rem' }}>BTech Portfolio Engineering Note</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: '#ffffff', marginBottom: '1rem' }}>
            Architectural Engineering of DIAMIVO
          </h3>
          <p style={{ color: 'var(--color-silver-light)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            DIAMIVO was designed as a modern full-stack web application demonstrating production-level modularity. The backend features Express.js REST APIs with robust MongoDB schemas, strict server-side inventory decrementing, and centralized error middleware. The frontend utilizes React (Vite), seamless localStorage persistence for cart and wishlist state synchronization, and reactive Framer Motion animations.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-gold">
              Explore The Shop
            </Link>
            <Link to="/order-tracking" className="btn btn-outline-gold">
              Try Order Tracking Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
