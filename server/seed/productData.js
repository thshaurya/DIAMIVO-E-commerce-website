/**
 * Seed data for DIAMIVO luxury jewellery products
 * Contains all 12 signature collection pieces
 */
const products = [
  {
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
    isNewArrival: false,
    rating: 4.9,
    numReviews: 18
  },
  {
    name: 'Celeste Solitaire Ring',
    slug: 'celeste-solitaire-ring',
    description: 'The epitome of classic romance. The Celeste Solitaire features a pristine 1.50-carat oval-cut diamond set in a minimalist four-prong platinum cathedral setting designed to maximize light return from every conceivable angle.',
    shortDescription: '1.50 ct Oval solitaire in handcrafted Platinum setting.',
    price: 245000,
    originalPrice: null,
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
    isNewArrival: true,
    rating: 5.0,
    numReviews: 24
  },
  {
    name: 'Élan Diamond Band',
    slug: 'elan-diamond-band',
    description: 'Understated luxury in full circle. The Élan Diamond Band features shared-prong round brilliant diamonds totaling 0.90 carats circling the entire eternity band, sculpted in warm 18K yellow gold.',
    shortDescription: '0.90 ct Total Weight eternity band in 18K Yellow Gold.',
    price: 92000,
    originalPrice: 105000,
    category: 'rings',
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K Yellow Gold',
    diamondDetails: {
      carat: 0.90,
      cut: 'Round Brilliant',
      color: 'F',
      clarity: 'VS1',
      certificate: 'IGI Certified'
    },
    stock: 12,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.8,
    numReviews: 12
  },
  {
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
    isNewArrival: false,
    rating: 5.0,
    numReviews: 9
  },
  {
    name: 'Serene Diamond Pendant',
    slug: 'serene-diamond-pendant',
    description: 'Graceful simplicity designed for everyday radiance. A single 0.75-carat pear-cut diamond suspended delicately from a shimmering 18-inch 18K yellow gold cable chain.',
    shortDescription: '0.75 ct Pear-cut solitaire pendant with 18K Yellow Gold chain.',
    price: 78000,
    originalPrice: null,
    category: 'necklaces',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K Yellow Gold',
    diamondDetails: {
      carat: 0.75,
      cut: 'Pear Brilliant',
      color: 'G',
      clarity: 'VS1',
      certificate: 'GIA Certified'
    },
    stock: 15,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.7,
    numReviews: 14
  },
  {
    name: 'Aurelia Diamond Drop',
    slug: 'aurelia-diamond-drop',
    description: 'Designed for unforgettable evenings. The Aurelia Drop earrings feature two cushion-cut diamonds totaling 2.10 carats linked with pavé diamond connectors that catch ambient light with fluid movement.',
    shortDescription: '2.10 ct Cushion-cut articulated drops in 18K White Gold.',
    price: 215000,
    originalPrice: 240000,
    category: 'earrings',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K White Gold',
    diamondDetails: {
      carat: 2.10,
      cut: 'Cushion Brilliant',
      color: 'F',
      clarity: 'VS1',
      certificate: 'GIA Certified'
    },
    stock: 6,
    isFeatured: true,
    isNewArrival: false,
    rating: 4.9,
    numReviews: 11
  },
  {
    name: 'Nocturne Diamond Studs',
    slug: 'nocturne-diamond-studs',
    description: 'The definitive diamond essential. A matched pair of round brilliant diamonds totaling 1.00 carat (0.50 ct each) mounted in three-prong martini settings in platinum for a low-profile, maximum-sparkle silhouette.',
    shortDescription: '1.00 ct Total Weight matched studs in Platinum martini settings.',
    price: 115000,
    originalPrice: 130000,
    category: 'earrings',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: 'Platinum 950',
    diamondDetails: {
      carat: 1.00,
      cut: 'Hearts & Arrows Ideal',
      color: 'E',
      clarity: 'VVS2',
      certificate: 'GIA Certified'
    },
    stock: 20,
    isFeatured: true,
    isNewArrival: false,
    rating: 5.0,
    numReviews: 32
  },
  {
    name: 'Étoile Diamond Hoops',
    slug: 'etoile-diamond-hoops',
    description: 'Contemporary glamour redefined. Huggie hoops engineered with inside-out diamonds totaling 0.80 carats in 18K rose gold, ensuring dazzling brilliance from every viewing angle.',
    shortDescription: '0.80 ct Inside-out pavé hoop earrings in 18K Rose Gold.',
    price: 84000,
    originalPrice: null,
    category: 'earrings',
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K Rose Gold',
    diamondDetails: {
      carat: 0.80,
      cut: 'Round Brilliant',
      color: 'G',
      clarity: 'VS2',
      certificate: 'IGI Certified'
    },
    stock: 9,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.8,
    numReviews: 8
  },
  {
    name: 'Elysian Diamond Bracelet',
    slug: 'elysian-diamond-bracelet',
    description: 'The quintessence of refined taste. An iconic flexible four-prong tennis bracelet adorned with 3.20 carats of uniform round brilliant diamonds set in solid 18K white gold with a double-locking safety latch.',
    shortDescription: '3.20 ct Classic tennis bracelet in 18K White Gold.',
    price: 295000,
    originalPrice: 330000,
    category: 'bracelets',
    images: [
      'https://images.unsplash.com/photo-1611591475883-70b99bc0e4e6?auto=format&fit=crop&w=1000&q=80'
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
    isNewArrival: false,
    rating: 4.9,
    numReviews: 19
  },
  {
    name: 'Céleste Diamond Bangle',
    slug: 'celeste-diamond-bangle',
    description: 'A sculptural statement piece. This hinged oval bangle is crafted from 18K yellow gold and accented with three channel rows of channel-set baguette and brilliant diamonds totaling 1.60 carats.',
    shortDescription: '1.60 ct Baguette & brilliant bangle in 18K Yellow Gold.',
    price: 175000,
    originalPrice: null,
    category: 'bracelets',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K Yellow Gold',
    diamondDetails: {
      carat: 1.60,
      cut: 'Baguette & Round',
      color: 'G',
      clarity: 'VS1',
      certificate: 'IGI Certified'
    },
    stock: 7,
    isFeatured: false,
    isNewArrival: false,
    rating: 4.7,
    numReviews: 6
  },
  {
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
    isNewArrival: true,
    rating: 5.0,
    numReviews: 16
  },
  {
    name: 'Emerald Garden Pendant',
    slug: 'emerald-garden-pendant',
    description: 'Nature’s most coveted hue. A vivid 1.80-carat octagonal step-cut Zambian emerald framed by two tiers of micro-pavé brilliant diamonds on an 18K yellow gold wheat chain.',
    shortDescription: '1.80 ct Zambian Emerald octagonal pendant in 18K Yellow Gold.',
    price: 195000,
    originalPrice: 225000,
    category: 'necklaces',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    metal: '18K Yellow Gold',
    diamondDetails: {
      carat: 0.50,
      cut: 'Round Brilliant',
      color: 'E',
      clarity: 'VVS2',
      certificate: 'IGI Certified'
    },
    gemstoneDetails: {
      stone: 'Zambian Emerald',
      carat: 1.80,
      origin: 'Kagem Mine, Zambia'
    },
    stock: 5,
    isFeatured: false,
    isNewArrival: true,
    rating: 4.9,
    numReviews: 10
  }
];

module.exports = products;
