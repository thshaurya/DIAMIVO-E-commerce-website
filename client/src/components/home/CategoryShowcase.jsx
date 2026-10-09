import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import { getCategories } from '../../services/api';
import { FiArrowRight } from 'react-icons/fi';

const fallbackCategories = [
  {
    name: 'Rings',
    slug: 'rings',
    description: 'Solitaires, halos, eternity bands, and bespoke engagement rings.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    itemCount: 4
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    description: 'Breathtaking tennis necklaces, luminous solitaires, and statement pendants.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    description: 'Timeless brilliant-cut studs, cascading diamond drops, and pavé hoops.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    itemCount: 3
  },
  {
    name: 'Bracelets',
    slug: 'bracelets',
    description: 'Iconic tennis bracelets and structured diamond bangles.',
    image: 'https://images.unsplash.com/photo-1611591475883-70b99bc0e4e6?auto=format&fit=crop&w=800&q=80',
    itemCount: 2
  }
];

const CategoryShowcase = () => {
  const [categories, setCategories] = useState(fallbackCategories);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getCategories();
        if (res.data && res.data.length > 0) {
          setCategories(res.data);
        }
      } catch (err) {
        // Fallback already in state
      }
    };
    fetchCats();
  }, []);

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="The Atelier Repertoire"
          title="Curated High Jewellery by Category"
          subtitle="Discover masterfully balanced proportions, from celestial solitaires to articulating diamond lines."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${cat.slug}`}
              className="card category-card"
              style={{
                position: 'relative',
                display: 'block',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                textDecoration: 'none',
                height: '380px'
              }}
            >
              {/* Background Image */}
              <img
                src={cat.image || fallbackCategories[0].image}
                alt={cat.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="category-img"
              />

              {/* Dark Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(6, 24, 39, 0.92) 0%, rgba(10, 37, 64, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem 1.5rem',
                  color: '#ffffff'
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    fontWeight: 600,
                    marginBottom: '0.375rem'
                  }}
                >
                  {cat.itemCount ? `${cat.itemCount} Designs` : 'Exclusive Pieces'}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.85rem',
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    fontWeight: 500
                  }}
                >
                  {cat.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-silver)',
                    lineHeight: '1.5',
                    marginBottom: '1rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {cat.description}
                </p>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--color-gold-light)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em'
                  }}
                >
                  Explore Collection <FiArrowRight />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .category-card:hover .category-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
};

export default CategoryShowcase;
