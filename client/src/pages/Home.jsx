import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SectionHeading from '../components/common/SectionHeading';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const Home = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Category Showcase */}
      <CategoryShowcase />

      {/* 3. Featured High Jewellery */}
      <FeaturedProducts />

      {/* 4. The 4Cs Diamond Masterclass Spotlight */}
      <section
        className="section"
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            <div>
              <SectionHeading
                eyebrow="The Science of Brilliance"
                title="The 4Cs Diamond Education"
                subtitle="Understanding Carat, Cut, Color, and Clarity allows you to select a diamond with unparalleled fire and enduring value."
                align="left"
                light={true}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(199, 164, 90, 0.2)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>01. Cut</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-silver)', lineHeight: 1.5 }}>Determines the diamond’s brilliance, scintillation, and fire under light.</p>
                </div>

                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(199, 164, 90, 0.2)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>02. Color</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-silver)', lineHeight: 1.5 }}>Graded from D (pure colorless) to Z, defining purity and rare crystal tone.</p>
                </div>

                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(199, 164, 90, 0.2)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>03. Clarity</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-silver)', lineHeight: 1.5 }}>Microscopic assessment of internal inclusions from Flawless to SI.</p>
                </div>

                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(199, 164, 90, 0.2)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>04. Carat</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-silver)', lineHeight: 1.5 }}>The exact metric measurement of diamond mass and physical spread.</p>
                </div>
              </div>

              <Link to="/diamonds" className="btn btn-gold btn-lg">
                Explore Full 4Cs Guide <FiArrowRight />
              </Link>
            </div>

            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80"
                alt="GIA Certified Diamond Education"
                style={{
                  width: '100%',
                  height: '460px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(199, 164, 90, 0.3)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Colored Gemstone Education Teaser */}
      <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            <div style={{ order: 2 }}>
              <img
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80"
                alt="Royal Ceylon Sapphire and Zambian Emeralds"
                style={{
                  width: '100%',
                  height: '420px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-xl)'
                }}
              />
            </div>

            <div style={{ order: 1 }}>
              <SectionHeading
                eyebrow="Beyond The Colorless"
                title="Rare Precious Gemstones"
                subtitle="From velvety royal blue Ceylon Sapphires to vivid green Zambian Emeralds, uncover the geological genesis and grading standards of colored stones."
                align="left"
              />

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)' }}>
                  <FiCheckCircle style={{ color: 'var(--color-gold)', fontSize: '1.25rem' }} />
                  <span><strong>Ceylon Sapphires:</strong> Prized cornflower and royal blue saturation.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)' }}>
                  <FiCheckCircle style={{ color: 'var(--color-gold)', fontSize: '1.25rem' }} />
                  <span><strong>Zambian Emeralds:</strong> Deep lush green tone with fine natural crystal clarity.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text)' }}>
                  <FiCheckCircle style={{ color: 'var(--color-gold)', fontSize: '1.25rem' }} />
                  <span><strong>Burmese Rubies:</strong> Legendary pigeon-blood red with natural fluorescence.</span>
                </li>
              </ul>

              <Link to="/stones" className="btn btn-outline btn-lg">
                Explore Gemstone Encyclopedia <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Concierge / Atelier Banner */}
      <section
        style={{
          backgroundColor: 'var(--color-primary)',
          color: '#ffffff',
          padding: '4.5rem 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(199, 164, 90, 0.2)'
        }}
      >
        <div className="container" style={{ maxWidth: '700px' }}>
          <IoDiamondOutline style={{ fontSize: '2.5rem', color: 'var(--color-gold)', marginBottom: '1rem' }} />
          <h2 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '1rem' }}>
            Looking for a Bespoke Solitaire?
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Our master gemologists assist you in sourcing specific GIA certified rough or polished stones tailored to your exact budget, metal, and setting.
          </p>
          <Link to="/about" className="btn btn-gold btn-lg">
            Consult With Our Gemologist
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
