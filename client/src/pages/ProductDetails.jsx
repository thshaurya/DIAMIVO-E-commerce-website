import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory, formatCurrency } from '../services/api';
import ProductCard from '../components/product/ProductCard';
import { IoDiamondOutline } from 'react-icons/io5';
import { FiHeart, FiShoppingBag, FiTruck, FiShield, FiCheck, FiArrowLeft } from 'react-icons/fi';

const fallbackAllProducts = [
  {
    _id: 'seed-1',
    name: 'Aurora Diamond Ring',
    slug: 'aurora-diamond-ring',
    description: 'An ethereal creation inspired by the Northern Lights, the Aurora Diamond Ring showcases a breathtaking 1.20-carat round brilliant solitaire surrounded by a micro-pavé halo set in lustrous 18K white gold. Each accent diamond is hand-selected for extraordinary fire and scintillation.',
    shortDescription: '1.20 ct Round Brilliant diamond with pavé halo in 18K White Gold.',
    price: 185000,
    originalPrice: 210000,
    category: 'rings',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K White Gold',
    diamondDetails: {
      carat: 1.20,
      cut: 'Round Brilliant',
      color: 'E',
      clarity: 'VVS1',
      certificate: 'GIA Certified'
    },
    stock: 8,
    isFeatured: true,
    rating: 4.9,
    numReviews: 18
  },
  {
    _id: 'seed-2',
    name: 'Celeste Solitaire Ring',
    slug: 'celeste-solitaire-ring',
    description: 'The epitome of classic romance. The Celeste Solitaire features a pristine 1.50-carat oval-cut diamond set in a minimalist four-prong platinum cathedral setting designed to maximize light return from every conceivable angle.',
    shortDescription: '1.50 ct Oval solitaire in handcrafted Platinum setting.',
    price: 245000,
    category: 'rings',
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: 'Platinum 950',
    diamondDetails: {
      carat: 1.50,
      cut: 'Oval Brilliant',
      color: 'D',
      clarity: 'IF',
      certificate: 'GIA Certified'
    },
    stock: 5,
    isFeatured: true,
    rating: 5.0,
    numReviews: 24
  },
  {
    _id: 'seed-4',
    name: 'Lumière Tennis Necklace',
    slug: 'lumiere-tennis-necklace',
    description: 'A masterwork of haute joaillerie. The Lumière Tennis Necklace gracefully articulates along the collarbone with 5.50 carats of graduated laboratory-inspected diamonds set in polished 18K white gold with a secure safety clasp.',
    shortDescription: '5.50 ct Graduated diamond line necklace in 18K White Gold.',
    price: 480000,
    originalPrice: 520000,
    category: 'necklaces',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K White Gold',
    diamondDetails: {
      carat: 5.50,
      cut: 'Round Brilliant',
      color: 'E',
      clarity: 'VVS2',
      certificate: 'GIA Certified'
    },
    stock: 3,
    isFeatured: true,
    rating: 5.0,
    numReviews: 9
  },
  {
    _id: 'seed-9',
    name: 'Elysian Diamond Bracelet',
    slug: 'elysian-diamond-bracelet',
    description: 'The quintessence of refined taste. An iconic flexible four-prong tennis bracelet adorned with 3.20 carats of uniform round brilliant diamonds set in solid 18K white gold with a double-locking safety latch.',
    shortDescription: '3.20 ct Classic tennis bracelet in 18K White Gold.',
    price: 295000,
    originalPrice: 330000,
    category: 'bracelets',
    images: [
      'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ],
    metal: '18K White Gold',
    diamondDetails: {
      carat: 3.20,
      cut: 'Round Brilliant',
      color: 'F',
      clarity: 'VS1',
      certificate: 'GIA Certified'
    },
    stock: 4,
    isFeatured: true,
    rating: 4.9,
    numReviews: 19
  },
  {
    _id: 'seed-11',
    name: 'Sapphire Halo Ring',
    slug: 'sapphire-halo-ring',
    description: 'Royal sophistication reimagined. A velvety 2.40-carat royal blue Ceylon sapphire centerpiece embraced by a luminous scalloped halo of brilliant diamonds in 18K white gold.',
    shortDescription: '2.40 ct Ceylon Sapphire with diamond halo in 18K White Gold.',
    price: 265000,
    originalPrice: 290000,
    category: 'rings',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K White Gold',
    diamondDetails: {
      carat: 0.65,
      cut: 'Round Brilliant',
      color: 'F',
      clarity: 'VS1',
      certificate: 'GIA Certified'
    },
    gemstoneDetails: {
      stone: 'Royal Blue Sapphire',
      carat: 2.40,
      origin: 'Ceylon (Sri Lanka)'
    },
    stock: 4,
    isFeatured: true,
    rating: 5.0,
    numReviews: 16
  }
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    window.scrollTo(0, 0);
    const loadProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById(id);
        if (res.data) {
          setProduct(res.data);
          setSelectedImage(res.data.images?.[0] || '');
          loadRelated(res.data.category, res.data._id);
        } else {
          findFallback();
        }
      } catch (err) {
        findFallback();
      } finally {
        setLoading(false);
      }
    };

    const findFallback = () => {
      const match =
        fallbackAllProducts.find((p) => p._id === id || p.slug === id) ||
        fallbackAllProducts[0];
      setProduct(match);
      setSelectedImage(match.images?.[0] || '');
      loadRelated(match.category, match._id);
    };

    const loadRelated = async (category, currentId) => {
      try {
        const relRes = await getProductsByCategory(category);
        if (relRes.data) {
          setRelatedProducts(relRes.data.filter((p) => p._id !== currentId).slice(0, 3));
          return;
        }
      } catch (e) {}
      setRelatedProducts(
        fallbackAllProducts.filter((p) => p.category === category && p._id !== currentId).slice(0, 3)
      );
    };

    loadProduct();
  }, [id]);

  // Sync wishlist status
  useEffect(() => {
    if (!product) return;
    try {
      const wishlist = JSON.parse(localStorage.getItem('diamivo-wishlist')) || [];
      setIsWishlisted(wishlist.some((item) => (item._id || item.slug) === (product._id || product.slug)));
    } catch (e) {}
  }, [product]);

  const toggleWishlist = () => {
    if (!product) return;
    try {
      let wishlist = JSON.parse(localStorage.getItem('diamivo-wishlist')) || [];
      const prodId = product._id || product.slug;
      const exists = wishlist.some((item) => (item._id || item.slug) === prodId);

      if (exists) {
        wishlist = wishlist.filter((item) => (item._id || item.slug) !== prodId);
        setIsWishlisted(false);
      } else {
        wishlist.push({
          _id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          category: product.category,
          images: product.images,
          metal: product.metal
        });
        setIsWishlisted(true);
      }

      localStorage.setItem('diamivo-wishlist', JSON.stringify(wishlist));
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (err) {}
  };

  const handleAddToCart = () => {
    if (!product) return;
    try {
      let cart = JSON.parse(localStorage.getItem('diamivo-cart')) || [];
      const prodId = product._id || product.slug;
      const existingIndex = cart.findIndex((item) => (item._id || item.slug) === prodId);

      if (existingIndex > -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
      } else {
        cart.push({
          _id: product._id,
          product: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          quantity: quantity,
          images: product.images,
          image: selectedImage || product.images?.[0] || '',
          metal: product.metal,
          category: product.category
        });
      }

      localStorage.setItem('diamivo-cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {}
  };

  if (loading || !product) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-primary)' }}>
          Retrieving Haute Joaillerie Specifications...
        </h3>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '80vh', padding: '3rem 0 6rem 0' }}>
      <div className="container">
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'inherit' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} style={{ color: 'inherit', textTransform: 'capitalize' }}>
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Main Product Showcase Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '4rem',
            backgroundColor: '#ffffff',
            padding: '2.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--color-border)',
            marginBottom: '4rem'
          }}
        >
          {/* Gallery Column */}
          <div>
            <div
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-silver-light)',
                height: '460px',
                marginBottom: '1rem',
                border: '1px solid var(--color-border)'
              }}
            >
              <img
                src={selectedImage || product.images?.[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail selector */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: selectedImage === img ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Purchase Action Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span className="badge badge-gold" style={{ textTransform: 'capitalize' }}>
                {product.category}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                Item Code: {product.slug?.toUpperCase()}
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--color-primary-dark)',
                lineHeight: 1.2,
                marginBottom: '1rem'
              }}
            >
              {product.name}
            </h1>

            {/* Price Row */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-primary-dark)' }}>
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span style={{ fontSize: '1.1rem', color: 'var(--color-text-subtle)', textDecoration: 'line-through' }}>
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-success)', fontWeight: 600 }}>
                Includes all applicable taxes & insurance
              </span>
            </div>

            {/* Description */}
            <p style={{ color: 'var(--color-text)', fontSize: '0.975rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Diamond 4C Quick Specifications Box */}
            <div
              style={{
                backgroundColor: 'var(--color-bg)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                border: '1px solid var(--color-border)',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-dark)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                <IoDiamondOutline /> Diamond & Gemological Credentials
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div><strong>Noble Metal:</strong> {product.metal}</div>
                <div><strong>Certification:</strong> {product.diamondDetails?.certificate || 'GIA Certified'}</div>
                <div><strong>Diamond Carat:</strong> {product.diamondDetails?.carat ? `${product.diamondDetails.carat} ct` : 'N/A'}</div>
                <div><strong>Cut Grade:</strong> {product.diamondDetails?.cut || 'Round Brilliant'}</div>
                <div><strong>Color Grade:</strong> {product.diamondDetails?.color || 'E-F (Colorless)'}</div>
                <div><strong>Clarity Grade:</strong> {product.diamondDetails?.clarity || 'VVS1 - VS1'}</div>
                {product.gemstoneDetails?.stone && (
                  <>
                    <div><strong>Precious Stone:</strong> {product.gemstoneDetails.stone}</div>
                    <div><strong>Stone Origin:</strong> {product.gemstoneDetails.origin}</div>
                  </>
                )}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '0.65rem 1rem', fontSize: '1rem', color: 'var(--color-text)' }}
                >
                  -
                </button>
                <span style={{ padding: '0.65rem 1rem', fontWeight: 600, minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '0.65rem 1rem', fontSize: '1rem', color: 'var(--color-text)' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn ${isAdded ? 'btn-gold' : 'btn-primary'} btn-lg`}
                style={{ flexGrow: 1 }}
              >
                {isAdded ? (
                  <>
                    <FiCheck /> Added to Shopping Bag
                  </>
                ) : (
                  <>
                    <FiShoppingBag /> Add to Shopping Bag
                  </>
                )}
              </button>

              <button
                onClick={toggleWishlist}
                className="btn btn-outline btn-lg"
                style={{
                  padding: '0.85rem 1.25rem',
                  color: isWishlisted ? 'var(--color-danger)' : 'var(--color-primary)',
                  borderColor: isWishlisted ? 'var(--color-danger)' : 'var(--color-border)'
                }}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <FiHeart style={{ fill: isWishlisted ? 'var(--color-danger)' : 'none' }} />
              </button>
            </div>

            {/* Trust and Delivery Footnotes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.8125rem', color: 'var(--color-text-muted)', paddingTop: '1.25rem', borderTop: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiTruck style={{ color: 'var(--color-gold)' }} />
                <span>Complimentary armored courier delivery with transit insurance.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiShield style={{ color: 'var(--color-gold)' }} />
                <span>Hallmarked certificate of authenticity and lifelong cleaning warranty.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Jewellery Section */}
        {relatedProducts.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', color: 'var(--color-primary-dark)', marginBottom: '1.75rem' }}>
              Complementary Atelier Creations
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id || rel.slug} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
