import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import ProductCard from '../product/ProductCard';
import { getFeaturedProducts } from '../../services/api';
import { FiArrowRight } from 'react-icons/fi';

const fallbackFeatured = [
  {
    _id: 'seed-1',
    name: 'Aurora Diamond Ring',
    slug: 'aurora-diamond-ring',
    category: 'rings',
    metal: '18K White Gold',
    price: 185000,
    originalPrice: 210000,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '1.20 ct Round Brilliant diamond with pavé halo in 18K White Gold.',
    isFeatured: true
  },
  {
    _id: 'seed-2',
    name: 'Celeste Solitaire Ring',
    slug: 'celeste-solitaire-ring',
    category: 'rings',
    metal: 'Platinum 950',
    price: 245000,
    images: ['https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '1.50 ct Oval solitaire in handcrafted Platinum setting.',
    isFeatured: true
  },
  {
    _id: 'seed-4',
    name: 'Lumière Tennis Necklace',
    slug: 'lumiere-tennis-necklace',
    category: 'necklaces',
    metal: '18K White Gold',
    price: 480000,
    originalPrice: 520000,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '5.50 ct Graduated diamond line necklace in 18K White Gold.',
    isFeatured: true
  },
  {
    _id: 'seed-9',
    name: 'Elysian Diamond Bracelet',
    slug: 'elysian-diamond-bracelet',
    category: 'bracelets',
    metal: '18K White Gold',
    price: 295000,
    originalPrice: 330000,
    images: ['https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    shortDescription: '3.20 ct Classic tennis bracelet in 18K White Gold.',
    isFeatured: true
  }
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState(fallbackFeatured);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await getFeaturedProducts();
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        // Fallback active
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border-subtle)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Signature Atelier Selections"
          title="The High Jewellery Collection"
          subtitle="Precision-cut solitaires, fluid tennis lines, and master-crafted gemstone creations designed for the discerning connoisseur."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id || product.slug} product={product} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/shop" className="btn btn-primary btn-lg">
            View Complete Catalogue (12 Pieces) <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
