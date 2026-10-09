import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import { FiArrowRight, FiShield, FiSun, FiDroplet } from 'react-icons/fi';

const stonesData = [
  {
    name: 'Ceylon Royal Sapphire',
    mineral: 'Corundum (Al₂O₃ with trace Iron & Titanium)',
    hardness: '9.0 on Mohs Scale',
    color: 'Velvety Royal Blue & Vivid Cornflower',
    provenance: 'Sri Lanka (Ceylon), Kashmir, Madagascar',
    description: 'Prized by royalty for millennia, blue sapphires are among the rarest and most durable minerals on Earth. Sri Lankan stones are celebrated for their transparent crystalline body and luminous medium-deep blue tone without dark extinction.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    link: '/shop?category=rings'
  },
  {
    name: 'Zambian Emerald',
    mineral: 'Beryl (Be₃Al₂Si₆O₁₈ colored by Chromium & Vanadium)',
    hardness: '7.5 – 8.0 on Mohs Scale',
    color: 'Vivid Bluish-Green to Pure Deep Green',
    provenance: 'Kagem Mine (Zambia), Muzo & Chivor (Colombia)',
    description: 'Emeralds are born from turbulent hydrothermal encounters between pegmatites and schist. Zambian emeralds are celebrated globally for exceptional clarity, cooler bluish undertones, and higher iron content providing superior structural stability.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    link: '/shop?category=necklaces'
  },
  {
    name: 'Burmese Pigeon Blood Ruby',
    mineral: 'Corundum (Al₂O₃ colored by Chromium)',
    hardness: '9.0 on Mohs Scale',
    color: 'Pure Vivid Crimson with Natural Red Fluorescence',
    provenance: 'Mogok Stone Tract (Burma), Montepuez (Mozambique)',
    description: 'The King of Gemstones. In addition to high refractory index, chromium causes fine rubies to naturally fluoresce red under ultraviolet and natural sunlight, making the gem appear as though an internal flame burns within.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    link: '/shop'
  }
];

const Stones = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Banner */}
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
            eyebrow="The World of Chromatic Rarity"
            title="Precious Gemstones Encyclopedia"
            subtitle="Understanding crystal families, geological origins, pleochroism, and care criteria for noble colored stones."
            light={true}
          />
        </div>
      </div>

      <div className="container" style={{ marginTop: '3.5rem' }}>
        {/* The Big Three Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '4rem' }}>
          {stonesData.map((stone, idx) => (
            <div
              key={stone.name}
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ffffff'
              }}
            >
              <div style={{ height: '100%', minHeight: '340px', position: 'relative' }}>
                <img
                  src={stone.image}
                  alt={stone.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Noble Gemstone Series
                  </div>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--color-primary-dark)', marginBottom: '1rem' }}>
                    {stone.name}
                  </h3>

                  <p style={{ color: 'var(--color-text)', fontSize: '0.925rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {stone.description}
                  </p>

                  <div style={{ backgroundColor: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem', border: '1px solid var(--color-border-subtle)' }}>
                    <div><strong>Mineral Family:</strong> {stone.mineral}</div>
                    <div><strong>Mohs Hardness:</strong> {stone.hardness}</div>
                    <div><strong>Key Provenance:</strong> {stone.provenance}</div>
                    <div><strong>Color Signature:</strong> {stone.color}</div>
                  </div>
                </div>

                <div>
                  <Link to={stone.link} className="btn btn-primary btn-sm">
                    View Jewellery with {stone.name.split(' ')[1]} <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mohs Hardness & Durability Table */}
        <div
          style={{
            backgroundColor: '#ffffff',
            padding: '3rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '4rem'
          }}
        >
          <SectionHeading
            eyebrow="Durability Comparison"
            title="The Mohs Hardness Scale in High Jewellery"
            subtitle="Mineral hardness determines scratch resistance and whether a gem is suitable for everyday solitaire rings versus occasional earrings."
          />

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Rating</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Mineral</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Jewellery Suitability</th>
                  <th style={{ padding: '0.875rem 1.25rem' }}>Care Guidance</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>10</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>Diamond</td>
                  <td style={{ padding: '1rem 1.25rem' }}>Exceptional (Daily Wear Solitaires)</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--color-text-muted)' }}>Ultrasonic and steam safe. Only another diamond can scratch a diamond.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>9</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>Ruby & Sapphire (Corundum)</td>
                  <td style={{ padding: '1rem 1.25rem' }}>Superb (Engagement & Eternity Rings)</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--color-text-muted)' }}>Highly scratch resistant; warm soapy water and soft brush recommended.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-gold-dark)' }}>7.5 - 8</td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600 }}>Emerald (Beryl)</td>
                  <td style={{ padding: '1rem 1.25rem' }}>Special Occasion (Protective Settings)</td>
                  <td style={{ padding: '1rem 1.25rem', color: 'var(--color-text-muted)' }}>Natural "jardin" inclusions require gentle care. Avoid ultrasonic vibration.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Gemstone Care Rules */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '1.75rem', color: 'var(--color-gold)', marginBottom: '1rem' }}><FiSun /></div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Avoid Extreme Heat</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Sudden thermal shock can expand inclusions in emeralds and colored gems. Remove when near high thermal sources.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '1.75rem', color: 'var(--color-gold)', marginBottom: '1rem' }}><FiDroplet /></div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Chemical Safeguards</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Apply perfumes, cosmetics, and lotions before putting on jewellery to avoid metal and facet luster erosion.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '1.75rem', color: 'var(--color-gold)', marginBottom: '1rem' }}><FiShield /></div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>Individual Vault Storage</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
              Store diamonds separate from colored gems in velvet compartments to eliminate contact friction scratches.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stones;
