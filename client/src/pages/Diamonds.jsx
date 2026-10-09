import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const Diamonds = () => {
  const [selectedCarat, setSelectedCarat] = useState(1.0);

  // Approximate round brilliant diameter by carat
  const getDiameter = (carat) => {
    return (6.5 * Math.cbrt(carat)).toFixed(1);
  };

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
            eyebrow="Gemological Institute Standards"
            title="The 4Cs Diamond Masterclass"
            subtitle="The definitive guide to understanding diamond quality, optical physics, and enduring value created by Robert M. Shipley and standardized globally by the GIA."
            light={true}
          />
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        {/* Interactive Carat Size Simulator */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '2.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
            marginBottom: '4rem'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>Interactive Demonstration</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-primary-dark)' }}>
              Carat Weight & Visual Spread Simulator
            </h3>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '0.925rem' }}>
              Carat refers to a diamond’s weight (1 carat = 200 milligrams). Adjust the slider to observe real-world millimeter scale for round brilliant cuts.
            </p>
          </div>

          <div style={{ maxWidth: '480px', margin: '0 auto 2.5rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--color-primary)' }}>Selected: {selectedCarat} Carat</span>
              <span style={{ color: 'var(--color-gold-dark)' }}>~{getDiameter(selectedCarat)} mm Diameter</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.25"
              value={selectedCarat}
              onChange={(e) => setSelectedCarat(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--color-gold)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-subtle)', marginTop: '0.25rem' }}>
              <span>0.5 ct</span>
              <span>1.0 ct</span>
              <span>1.5 ct</span>
              <span>2.0 ct</span>
              <span>2.5 ct</span>
              <span>3.0 ct</span>
            </div>
          </div>

          {/* Scaled Diamond Visualization Preview */}
          <div
            style={{
              height: '160px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--color-primary-dark)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.5rem'
            }}
          >
            <div
              style={{
                width: `${selectedCarat * 32 + 20}px`,
                height: `${selectedCarat * 32 + 20}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #ffffff 10%, #dcecf7 40%, #5fa8d3 80%, #1e5f91 100%)',
                boxShadow: '0 0 25px rgba(255, 255, 255, 0.6), 0 0 40px rgba(95, 168, 211, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
            <span style={{ color: '#ffffff', fontSize: '0.8125rem', marginTop: '1rem', letterSpacing: '0.05em' }}>
              Optical projection for {selectedCarat} Carat ({getDiameter(selectedCarat)} mm)
            </span>
          </div>
        </div>

        {/* The 4 Deep Explanatory Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          {/* 1. CUT */}
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-gold)', fontWeight: 600 }}>01</span>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Cut Grade (Light Fire)</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Cut is widely considered the most critical factor influencing beauty. It refers to proportions, symmetry, and polish, determining how efficiently light enters and bounces back to the viewer’s eye.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text)', marginTop: 'auto' }}>
              <li><strong>Brilliance:</strong> Total white light reflections.</li>
              <li><strong>Fire:</strong> Dispersion of light into rainbow flashes.</li>
              <li><strong>Scintillation:</strong> Sparkle pattern produced when in motion.</li>
            </ul>
          </div>

          {/* 2. COLOR */}
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-gold)', fontWeight: 600 }}>02</span>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Color Scale (D to Z)</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              In white diamonds, the absence of color denotes higher grade and rarity. The GIA scale ranges from D (wholly colorless) to Z (noticeable light yellow or brown body tint).
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text)', marginTop: 'auto' }}>
              <li><strong>D - F:</strong> Colorless (Pure ice, extraordinary rarity).</li>
              <li><strong>G - J:</strong> Near Colorless (Exceptional everyday value).</li>
              <li><strong>K - M:</strong> Faint warmth (Complements yellow gold).</li>
            </ul>
          </div>

          {/* 3. CLARITY */}
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-gold)', fontWeight: 600 }}>03</span>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Clarity (Inclusions)</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Natural diamonds formed miles beneath Earth’s crust often bear microscopic birthmarks: internal <em>inclusions</em> and surface <em>blemishes</em>, analyzed under 10x magnification.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text)', marginTop: 'auto' }}>
              <li><strong>FL / IF:</strong> Flawless / Internally Flawless.</li>
              <li><strong>VVS1 - VVS2:</strong> Very, very slight inclusions.</li>
              <li><strong>VS1 - VS2:</strong> Eye-clean to the naked eye.</li>
            </ul>
          </div>

          {/* 4. CARAT */}
          <div className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-gold)', fontWeight: 600 }}>04</span>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)' }}>Carat Weight</h3>
            </div>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Diamond price jumps non-linearly at milestone weights (e.g. 1.00 ct, 2.00 ct) due to the exponential rarity of recovering large rough crystals without compromising crystal clarity.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text)', marginTop: 'auto' }}>
              <li>1 metric carat = 0.200 grams.</li>
              <li>Divided into 100 "points" (e.g. 75 points = 0.75 ct).</li>
              <li>Setting style dramatically enhances apparent visual spread.</li>
            </ul>
          </div>
        </div>

        {/* Anatomical Cross Section */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-primary-dark)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Anatomy of a Brilliant Cut Solitaire
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>Table</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>The largest flat facet atop the diamond, acting as the primary window for ambient light entry.</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>Crown</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>The upper portion from the girdle to the table, refracting incoming rays into spectral fire.</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>Girdle</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>The outer perimeter edge that functions as the setting rim for prongs or bezel mounts.</p>
            </div>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>Pavilion</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>The lower cone shaped cone facets that reflect light internally back through the table.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link to="/shop" className="btn btn-gold btn-lg">
              Explore Certified Diamond Jewellery <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diamonds;
