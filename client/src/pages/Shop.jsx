import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../services/api';
import { FiSearch, FiSliders } from 'react-icons/fi';

const fallbackAllProducts = [
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
    isFeatured: true,
    rating: 4.9
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
    isFeatured: true,
    rating: 5.0
  },
  {
    _id: 'seed-3',
    name: 'Élan Diamond Band',
    slug: 'elan-diamond-band',
    category: 'rings',
    metal: '18K Yellow Gold',
    price: 92000,
    originalPrice: 105000,
    images: ['https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '0.90 ct Total Weight eternity band in 18K Yellow Gold.',
    isFeatured: false,
    rating: 4.8
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
    isFeatured: true,
    rating: 5.0
  },
  {
    _id: 'seed-5',
    name: 'Serene Diamond Pendant',
    slug: 'serene-diamond-pendant',
    category: 'necklaces',
    metal: '18K Yellow Gold',
    price: 78000,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '0.75 ct Pear-cut solitaire pendant with 18K Yellow Gold chain.',
    isFeatured: false,
    rating: 4.7
  },
  {
    _id: 'seed-6',
    name: 'Aurelia Diamond Drop',
    slug: 'aurelia-diamond-drop',
    category: 'earrings',
    metal: '18K White Gold',
    price: 215000,
    originalPrice: 240000,
    images: ['https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '2.10 ct Cushion-cut articulated drops in 18K White Gold.',
    isFeatured: true,
    rating: 4.9
  },
  {
    _id: 'seed-7',
    name: 'Nocturne Diamond Studs',
    slug: 'nocturne-diamond-studs',
    category: 'earrings',
    metal: 'Platinum 950',
    price: 115000,
    originalPrice: 130000,
    images: ['https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '1.00 ct Total Weight matched studs in Platinum martini settings.',
    isFeatured: true,
    rating: 5.0
  },
  {
    _id: 'seed-8',
    name: 'Étoile Diamond Hoops',
    slug: 'etoile-diamond-hoops',
    category: 'earrings',
    metal: '18K Rose Gold',
    price: 84000,
    images: ['https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '0.80 ct Inside-out pavé hoop earrings in 18K Rose Gold.',
    isFeatured: false,
    rating: 4.8
  },
  {
    _id: 'seed-9',
    name: 'Elysian Diamond Bracelet',
    slug: 'elysian-diamond-bracelet',
    category: 'bracelets',
    metal: '18K White Gold',
    price: 295000,
    originalPrice: 330000,
    images: ['https://images.unsplash.com/photo-1611591475883-70b99bc0e4e6?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '3.20 ct Classic tennis bracelet in 18K White Gold.',
    isFeatured: true,
    rating: 4.9
  },
  {
    _id: 'seed-10',
    name: 'Céleste Diamond Bangle',
    slug: 'celeste-diamond-bangle',
    category: 'bracelets',
    metal: '18K Yellow Gold',
    price: 175000,
    images: ['https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '1.60 ct Baguette & brilliant bangle in 18K Yellow Gold.',
    isFeatured: false,
    rating: 4.7
  },
  {
    _id: 'seed-11',
    name: 'Sapphire Halo Ring',
    slug: 'sapphire-halo-ring',
    category: 'rings',
    metal: '18K White Gold',
    price: 265000,
    originalPrice: 290000,
    images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '2.40 ct Ceylon Sapphire with diamond halo in 18K White Gold.',
    isFeatured: true,
    rating: 5.0
  },
  {
    _id: 'seed-12',
    name: 'Emerald Garden Pendant',
    slug: 'emerald-garden-pendant',
    category: 'necklaces',
    metal: '18K Yellow Gold',
    price: 195000,
    originalPrice: 225000,
    images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'],
    shortDescription: '1.80 ct Zambian Emerald octagonal pendant in 18K Yellow Gold.',
    isFeatured: false,
    rating: 4.9
  }
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState(fallbackAllProducts);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(true);

  // Sync category param with state
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setActiveCategory(cat.toLowerCase());
  }, [searchParams]);

  // Fetch from API or filter fallback
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory !== 'all') params.category = activeCategory;
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (sortOption) params.sort = sortOption;

        const res = await getProducts(params);
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        } else if (res.data && res.data.length === 0 && (searchQuery || activeCategory !== 'all')) {
          setProducts([]);
        } else {
          applyLocalFilter();
        }
      } catch (err) {
        applyLocalFilter();
      } finally {
        setLoading(false);
      }
    };

    const applyLocalFilter = () => {
      let filtered = [...fallbackAllProducts];
      if (activeCategory !== 'all') {
        filtered = filtered.filter((p) => p.category === activeCategory);
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.metal.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q)
        );
      }
      if (sortOption === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
      }
      setProducts(filtered);
    };

    loadProducts();
  }, [activeCategory, searchQuery, sortOption]);

  const handleCategoryChange = (slug) => {
    setActiveCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: slug });
    }
  };

  const categories = [
    { name: 'All Pieces', slug: 'all' },
    { name: 'Rings', slug: 'rings' },
    { name: 'Necklaces', slug: 'necklaces' },
    { name: 'Earrings', slug: 'earrings' },
    { name: 'Bracelets', slug: 'bracelets' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', paddingBottom: '6rem' }}>
      {/* Header Banner */}
      <div
        style={{
          backgroundColor: 'var(--color-primary-dark)',
          color: '#ffffff',
          padding: '4rem 0 3rem 0',
          borderBottom: '1px solid rgba(199, 164, 90, 0.2)'
        }}
      >
        <div className="container">
          <SectionHeading
            eyebrow="The Atelier Catalogue"
            title="High Diamond & Gemstone Jewellery"
            subtitle="Individually hallmarked pieces set in 18K white gold, platinum, and noble precious alloys."
            light={true}
          />
        </div>
      </div>

      <div className="container" style={{ marginTop: '2.5rem' }}>
        {/* Filter and Search Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.25rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
            marginBottom: '2.5rem'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryChange(cat.slug)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor:
                    activeCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-silver-light)',
                  color: activeCategory === cat.slug ? '#ffffff' : 'var(--color-text)',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input and Sort Select */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ position: 'relative', minWidth: '240px' }}>
              <FiSearch
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }}
              />
              <input
                type="text"
                placeholder="Search diamonds, metals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 1rem 0.55rem 2.25rem',
                  fontSize: '0.875rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  outline: 'none'
                }}
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.875rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#ffffff',
                color: 'var(--color-text)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="featured">Sort: Curated Pieces</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--color-border)'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary-dark)', marginBottom: '0.5rem' }}>
              No Creations Match Your Selection
            </h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Try adjusting your search criteria or resetting filters to view our full collection.
            </p>
            <button
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              className="btn btn-outline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {products.map((product) => (
              <ProductCard key={product._id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
