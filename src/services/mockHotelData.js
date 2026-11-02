/**
 * Mock Hotel Data & Interactive LocalStorage Store for StayNest UI Slicing.
 * Ensures all Landing, Search, Hotel Detail, AI Concierge, Checkout, Bookings,
 * Wishlist, Guests, Profile, and Manager Console screens render & work seamlessly
 * before backend Hotel APIs are connected.
 */

const LS_KEYS = {
  HOTELS: 'staynest.mock.hotels.v1',
  ROOMS: 'staynest.mock.rooms.v1',
  BOOKINGS: 'staynest.mock.bookings.v1',
  WISHLIST: 'staynest.mock.wishlist.v1',
  GUESTS: 'staynest.mock.guests.v1',
  PROFILE: 'staynest.mock.profile.v1',
  INVENTORY: 'staynest.mock.inventory.v1',
};

function readLS(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function isoPlusDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const INITIAL_HOTELS = [
  {
    id: 101,
    name: 'The Nam Hai Sanctuary',
    city: 'Hoi An',
    country: 'Vietnam',
    price: 6850,
    minPrice: 6850,
    averageRating: 4.9,
    reviewCount: 148,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Infinity Pool',
      'Private Beachfront',
      'Spa & Wellness',
      'Complimentary Breakfast',
      'Free Wi-Fi',
      'Airport Transfer',
      '24/7 Concierge',
      'Fine Dining',
    ],
    contactInfo: {
      address: 'Block Ha My Dong B, Dien Duong, Hoi An, Vietnam',
      phoneNumber: '+84 235 394 0000',
      email: 'concierge@namhaisanctuary.vn',
      location: '15.9219,108.3282',
    },
  },
  {
    id: 102,
    name: 'Son Tra Cliff Retreat',
    city: 'Da Nang',
    country: 'Vietnam',
    price: 7400,
    minPrice: 7400,
    averageRating: 4.8,
    reviewCount: 112,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Ocean View Terrace',
      'Infinity Pool',
      'Free Wi-Fi',
      'Spa & Wellness',
      'Fitness Studio',
      'Complimentary Breakfast',
    ],
    contactInfo: {
      address: 'Bai Bac, Son Tra Peninsula, Da Nang, Vietnam',
      phoneNumber: '+84 236 393 8888',
      email: 'reservations@sontracliff.vn',
      location: '16.1204,108.2995',
    },
  },
  {
    id: 103,
    name: 'Emerald Bay Pavilion',
    city: 'Phu Quoc',
    country: 'Vietnam',
    price: 5900,
    minPrice: 5900,
    averageRating: 4.9,
    reviewCount: 96,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Private Plunge Pool',
      'Sunset Lounge',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Spa & Wellness',
      'Airport Transfer',
    ],
    contactInfo: {
      address: 'Khem Beach, An Thoi, Phu Quoc Island, Vietnam',
      phoneNumber: '+84 297 377 9999',
      email: 'stay@emeraldbayphuquoc.vn',
      location: '10.0365,104.0309',
    },
  },
  {
    id: 104,
    name: 'Misty Terraces Lodge',
    city: 'Sapa',
    country: 'Vietnam',
    price: 4650,
    minPrice: 4650,
    averageRating: 4.7,
    reviewCount: 84,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Heated Mountain Pool',
      'Herbal Bath Spa',
      'Fireplace Lounge',
      'Complimentary Breakfast',
      'Free Wi-Fi',
      'Guided Trekking',
    ],
    contactInfo: {
      address: 'Muong Hoa Valley, Sapa, Lao Cai, Vietnam',
      phoneNumber: '+84 214 387 2222',
      email: 'hello@mistyterraces.vn',
      location: '22.3164,103.8738',
    },
  },
  {
    id: 105,
    name: 'Pine Whisper Villa',
    city: 'Da Lat',
    country: 'Vietnam',
    price: 4200,
    minPrice: 4200,
    averageRating: 4.8,
    reviewCount: 73,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Botanical Garden',
      'Artisan Tea Room',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Fireplace Suite',
      '24/7 Concierge',
    ],
    contactInfo: {
      address: 'Tuyen Lam Lake, Ward 4, Da Lat, Vietnam',
      phoneNumber: '+84 263 382 6688',
      email: 'hosts@pinewhisper.vn',
      location: '11.9012,108.4316',
    },
  },
  {
    id: 106,
    name: 'Ubud Canopy House',
    city: 'Bali',
    country: 'Indonesia',
    price: 8200,
    minPrice: 8200,
    averageRating: 4.9,
    reviewCount: 164,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Jungle Infinity Pool',
      'Yoga Pavilion',
      'Spa & Wellness',
      'Free Wi-Fi',
      'Organic Dining',
      'Airport Transfer',
    ],
    contactInfo: {
      address: 'Jl. Raya Sayan, Ubud, Gianyar, Bali',
      phoneNumber: '+62 361 975 888',
      email: 'sanctuary@ubudcanopy.com',
      location: '-8.5069,115.2465',
    },
  },
  {
    id: 107,
    name: 'Arashiyama Bamboo Ryokan',
    city: 'Kyoto',
    country: 'Japan',
    price: 9400,
    minPrice: 9400,
    averageRating: 5.0,
    reviewCount: 91,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Private Onsen Bath',
      'Kaiseki Breakfast',
      'Zen Courtyard',
      'Free Wi-Fi',
      'Tea Ceremony',
      '24/7 Concierge',
    ],
    contactInfo: {
      address: 'Saga Tenryuji, Ukyo Ward, Kyoto, Japan',
      phoneNumber: '+81 75 872 5500',
      email: 'welcome@arashiyamaryokan.jp',
      location: '35.0138,135.6731',
    },
  },
  {
    id: 108,
    name: 'Metropole Heritage Residence',
    city: 'Hanoi',
    country: 'Vietnam',
    price: 6200,
    minPrice: 6200,
    averageRating: 4.8,
    reviewCount: 129,
    active: true,
    photos: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&fit=crop',
    ],
    amenities: [
      'Courtyard Pool',
      'French Bistro',
      'Spa & Wellness',
      'Free Wi-Fi',
      'Airport Transfer',
      'Butler Service',
    ],
    contactInfo: {
      address: '15 Ngo Quyen, Hoan Kiem, Hanoi, Vietnam',
      phoneNumber: '+84 24 3826 6919',
      email: 'heritage@metropoleresidence.vn',
      location: '21.0256,105.8562',
    },
  },
];

function buildDefaultRoomsForHotel(hotel) {
  const base = Number(hotel.price) || 5000;
  return [
    {
      id: hotel.id * 10 + 1,
      hotelId: hotel.id,
      type: 'Garden Courtyard Suite',
      price: base,
      basePrice: base,
      capacity: 2,
      totalCount: 6,
      photos: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80&fit=crop',
      ],
      amenities: ['King Bed', 'Private Terrace', 'Rain Shower', 'Artisan Minibar'],
    },
    {
      id: hotel.id * 10 + 2,
      hotelId: hotel.id,
      type: 'Horizon Panorama Residence',
      price: Math.round(base * 1.35),
      basePrice: Math.round(base * 1.35),
      capacity: 3,
      totalCount: 4,
      photos: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80&fit=crop',
        'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80&fit=crop',
      ],
      amenities: ['Panoramic View', 'Soaking Tub', 'Complimentary Breakfast', 'Espresso Bar'],
    },
    {
      id: hotel.id * 10 + 3,
      hotelId: hotel.id,
      type: 'Grand Sanctuary Pool Villa',
      price: Math.round(base * 1.85),
      basePrice: Math.round(base * 1.85),
      capacity: 4,
      totalCount: 2,
      photos: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&fit=crop',
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80&fit=crop',
      ],
      amenities: ['Private Plunge Pool', 'Dedicated Butler', 'Airport Transfer', 'Living Pavilion'],
    },
  ];
}

const SAMPLE_REVIEWS = [
  {
    id: 501,
    guestName: 'Minh Anh Nguyen',
    rating: 5,
    comment:
      'Every detail felt unhurried and deeply thoughtful. Morning coffee overlooking the water was unforgettable.',
    createdAt: '2026-09-14T09:30:00Z',
  },
  {
    id: 502,
    guestName: 'Liam Everett',
    rating: 5,
    comment:
      'Architectural calm at its finest. The linen quality, quiet pool terrace, and warm concierge team exceeded expectations.',
    createdAt: '2026-08-22T15:10:00Z',
  },
  {
    id: 503,
    guestName: 'Claire Dubois',
    rating: 5,
    comment:
      'Seamless private check-in, serene spa rituals, and artisanal local breakfast each morning. We cannot wait to return.',
    createdAt: '2026-07-19T11:45:00Z',
  },
  {
    id: 504,
    guestName: 'Hoang Nam Tran',
    rating: 4,
    comment:
      'Spacious suite with natural timber finishes and wonderful soundproofing. Ideal retreat for a long weekend.',
    createdAt: '2026-06-08T18:20:00Z',
  },
];

function paginate(items, page = 0, size = 12) {
  const p = Math.max(0, Number(page) || 0);
  const s = Math.max(1, Number(size) || 12);
  const start = p * s;
  const content = items.slice(start, start + s);
  const totalPages = Math.max(1, Math.ceil(items.length / s));
  return {
    content,
    totalElements: items.length,
    totalPages,
    number: p,
    size: s,
    first: p === 0,
    last: p >= totalPages - 1,
    empty: content.length === 0,
    numberOfElements: content.length,
  };
}

export function getStoredHotels() {
  const existing = readLS(LS_KEYS.HOTELS, null);
  if (Array.isArray(existing) && existing.length > 0) return existing;
  writeLS(LS_KEYS.HOTELS, INITIAL_HOTELS);
  return INITIAL_HOTELS;
}

export function getStoredRoomsMap() {
  const existing = readLS(LS_KEYS.ROOMS, null);
  if (existing && typeof existing === 'object') return existing;
  const initial = {};
  for (const h of getStoredHotels()) {
    initial[h.id] = buildDefaultRoomsForHotel(h);
  }
  writeLS(LS_KEYS.ROOMS, initial);
  return initial;
}

export function getRoomsByHotelId(hotelId) {
  const id = Number(hotelId);
  const map = getStoredRoomsMap();
  if (Array.isArray(map[id]) && map[id].length > 0) return map[id];
  const hotel = getStoredHotels().find((h) => Number(h.id) === id) || INITIAL_HOTELS[0];
  const built = buildDefaultRoomsForHotel(hotel);
  map[id] = built;
  writeLS(LS_KEYS.ROOMS, map);
  return built;
}

export function getStoredGuests() {
  const existing = readLS(LS_KEYS.GUESTS, null);
  if (Array.isArray(existing)) return existing;
  const initial = [
    { id: 1, name: 'Le Duc Thang', gender: 'MALE', age: 23 },
    { id: 2, name: 'Nguyen Minh Chau', gender: 'FEMALE', age: 22 },
  ];
  writeLS(LS_KEYS.GUESTS, initial);
  return initial;
}

export function getStoredBookings() {
  const existing = readLS(LS_KEYS.BOOKINGS, null);
  if (Array.isArray(existing)) return existing;
  const hotels = getStoredHotels();
  const h1 = hotels[0];
  const h2 = hotels[1];
  const r1 = getRoomsByHotelId(h1.id)[0];
  const r2 = getRoomsByHotelId(h2.id)[1];
  const guests = getStoredGuests();

  const initial = [
    {
      id: 9012,
      hotel: h1,
      room: r1,
      roomsCount: 1,
      checkInDate: isoPlusDays(5),
      checkOutDate: isoPlusDays(8),
      bookingStatus: 'CONFIRMED',
      amount: r1.price * 3,
      guests: [guests[0]],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
      id: 8845,
      hotel: h2,
      room: r2,
      roomsCount: 1,
      checkInDate: isoPlusDays(-18),
      checkOutDate: isoPlusDays(-15),
      bookingStatus: 'COMPLETED',
      amount: r2.price * 3,
      guests: guests,
      createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
    },
    {
      id: 8710,
      hotel: hotels[3],
      room: getRoomsByHotelId(hotels[3].id)[0],
      roomsCount: 1,
      checkInDate: isoPlusDays(14),
      checkOutDate: isoPlusDays(16),
      bookingStatus: 'CANCELLED',
      refundPending: true,
      amount: getRoomsByHotelId(hotels[3].id)[0].price * 2,
      guests: [guests[0]],
      createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    },
  ];
  writeLS(LS_KEYS.BOOKINGS, initial);
  return initial;
}

export const mockHotelApi = {
  // Hotels & Search
  listCurated(params = {}) {
    const hotels = getStoredHotels().filter((h) => h.active !== false);
    return paginate(hotels, params.page ?? 0, params.size ?? 12);
  },

  searchHotels(params = {}) {
    let list = getStoredHotels().filter((h) => h.active !== false);
    const city = (params.city || '').trim().toLowerCase();
    if (city) {
      const matched = list.filter(
        (h) =>
          h.city.toLowerCase().includes(city) ||
          (h.country || '').toLowerCase().includes(city) ||
          h.name.toLowerCase().includes(city)
      );
      if (matched.length > 0) list = matched;
    }
    if (params.minPrice && Number(params.minPrice) > 0) {
      list = list.filter((h) => Number(h.price) >= Number(params.minPrice));
    }
    if (params.maxPrice && Number(params.maxPrice) > 0) {
      list = list.filter((h) => Number(h.price) <= Number(params.maxPrice));
    }
    if (params.minRating && Number(params.minRating) > 0) {
      list = list.filter((h) => Number(h.averageRating || 0) >= Number(params.minRating));
    }
    const sortKey = String(params.sortBy || params.sort || '').toUpperCase();
    if (sortKey === 'PRICE_ASC') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortKey === 'PRICE_DESC') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortKey === 'RATING_DESC' || sortKey === 'TOP_RATED') {
      list = [...list].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    }
    return paginate(list, params.page ?? 0, params.size ?? 12);
  },

  searchHotelsNL(body = {}) {
    const q = (body.query || '').toLowerCase();
    const hotels = getStoredHotels().filter((h) => h.active !== false);
    const detectedHotel = hotels.find(
      (h) =>
        q.includes(h.city.toLowerCase()) ||
        (h.country && q.includes(h.country.toLowerCase()))
    );
    const priceMatch = q.match(/under\s*(\d+)/i);
    const maxPrice = priceMatch ? Number(priceMatch[1]) : undefined;
    const interpretedQuery = {
      city: detectedHotel?.city || body.city || 'Hoi An',
      startDate: body.startDate || isoPlusDays(2),
      endDate: body.endDate || isoPlusDays(5),
      roomsCount: body.roomsCount || 1,
      adults: body.adults || 2,
      ...(maxPrice ? { maxPrice } : {}),
      sortBy: q.includes('rating') || q.includes('best') ? 'RATING_DESC' : 'PRICE_ASC',
    };
    const results = this.searchHotels(interpretedQuery).content;
    return {
      interpretedQuery,
      missingFields: [],
      hotels: results,
      content: results,
    };
  },

  getHotelInfo(hotelId) {
    const id = Number(hotelId);
    const hotels = getStoredHotels();
    const hotel = hotels.find((h) => Number(h.id) === id) || hotels[0];
    const rooms = getRoomsByHotelId(hotel.id);
    return { hotel, rooms };
  },

  getHotelReviews(hotelId, page = 0, size = 6) {
    const reviews = SAMPLE_REVIEWS.map((r, idx) => ({
      ...r,
      id: Number(hotelId) * 100 + idx,
    }));
    return paginate(reviews, page, size);
  },

  askHotelQuestion(hotelId, question = '') {
    const { hotel } = this.getHotelInfo(hotelId);
    const q = question.toLowerCase();
    if (q.includes('breakfast') || q.includes('dining') || q.includes('food')) {
      return {
        answer: `Yes — ${hotel.name} serves an artisanal à-la-carte and seasonal buffet breakfast daily from 6:30 AM to 10:30 AM, included with Horizon and Villa reservations.`,
      };
    }
    if (q.includes('airport') || q.includes('transfer') || q.includes('check')) {
      return {
        answer: `Check-in at ${hotel.name} begins at 2:00 PM and check-out is at 12:00 PM. Private chauffeur airport transfers in ${hotel.city} can be arranged 24 hours prior to arrival.`,
      };
    }
    if (q.includes('pool') || q.includes('spa')) {
      return {
        answer: `${hotel.name} features a tranquil infinity pool open from 6:00 AM to 9:00 PM alongside holistic spa pavilions offering signature botanical treatments.`,
      };
    }
    return {
      answer: `${hotel.name} in ${hotel.city} offers ${(hotel.amenities || []).slice(0, 5).join(', ')}. Our 24/7 concierge team is delighted to tailor every detail of your stay.`,
    };
  },

  // Wishlist
  getWishlist(q = {}) {
    const ids = readLS(LS_KEYS.WISHLIST, [101, 103]);
    const hotels = getStoredHotels().filter((h) => ids.includes(Number(h.id)));
    return paginate(hotels, q.page ?? 0, q.size ?? 24);
  },

  addToWishlist(hotelId) {
    const ids = readLS(LS_KEYS.WISHLIST, [101, 103]);
    const id = Number(hotelId);
    if (!ids.includes(id)) {
      writeLS(LS_KEYS.WISHLIST, [...ids, id]);
    }
  },

  removeFromWishlist(hotelId) {
    const ids = readLS(LS_KEYS.WISHLIST, [101, 103]);
    const id = Number(hotelId);
    writeLS(
      LS_KEYS.WISHLIST,
      ids.filter((x) => Number(x) !== id)
    );
  },

  // Guests
  listGuests(q = {}) {
    return paginate(getStoredGuests(), q.page ?? 0, q.size ?? 20);
  },

  createGuest(body) {
    const list = getStoredGuests();
    const created = {
      id: Date.now(),
      name: body.name,
      gender: body.gender || 'OTHER',
      age: Number(body.age) || 25,
    };
    writeLS(LS_KEYS.GUESTS, [created, ...list]);
    return created;
  },

  updateGuest(id, body) {
    const list = getStoredGuests().map((g) =>
      Number(g.id) === Number(id) ? { ...g, ...body, id: g.id } : g
    );
    writeLS(LS_KEYS.GUESTS, list);
  },

  deleteGuest(id) {
    const list = getStoredGuests().filter((g) => Number(g.id) !== Number(id));
    writeLS(LS_KEYS.GUESTS, list);
  },

  // Bookings & Checkout
  getMyBookings(q = {}) {
    return paginate(getStoredBookings(), q.page ?? 0, q.size ?? 50);
  },

  initBooking(body) {
    const { hotel, rooms } = this.getHotelInfo(body.hotelId);
    const room = rooms.find((r) => Number(r.id) === Number(body.roomId)) || rooms[0];
    const nights = Math.max(
      1,
      Math.round(
        (new Date(body.checkOutDate).getTime() - new Date(body.checkInDate).getTime()) / 86400000
      )
    );
    const roomsCount = Number(body.roomsCount) || 1;
    const booking = {
      id: Math.floor(1000 + Math.random() * 9000),
      hotel,
      room,
      roomsCount,
      checkInDate: body.checkInDate,
      checkOutDate: body.checkOutDate,
      bookingStatus: 'RESERVED',
      amount: room.price * nights * roomsCount,
      guests: [],
      createdAt: new Date().toISOString(),
    };
    const list = getStoredBookings();
    writeLS(LS_KEYS.BOOKINGS, [booking, ...list]);
    return booking;
  },

  addBookingGuests(bookingId, guestIds = []) {
    const allGuests = getStoredGuests();
    const chosen = allGuests.filter((g) => guestIds.map(Number).includes(Number(g.id)));
    const list = getStoredBookings().map((b) =>
      Number(b.id) === Number(bookingId)
        ? { ...b, guests: chosen, bookingStatus: 'GUESTS_ADDED' }
        : b
    );
    writeLS(LS_KEYS.BOOKINGS, list);
    return list.find((b) => Number(b.id) === Number(bookingId));
  },

  initiatePayment(bookingId) {
    const list = getStoredBookings().map((b) =>
      Number(b.id) === Number(bookingId) ? { ...b, bookingStatus: 'CONFIRMED' } : b
    );
    writeLS(LS_KEYS.BOOKINGS, list);
    return {
      sessionUrl: `/payments/success?bookingId=${bookingId}&session_id=sn_demo_${bookingId}`,
    };
  },

  getBooking(bookingId) {
    const list = getStoredBookings();
    return list.find((b) => Number(b.id) === Number(bookingId)) || list[0];
  },

  getBookingStatus(bookingId) {
    const b = this.getBooking(bookingId);
    return { bookingStatus: b?.bookingStatus || 'CONFIRMED' };
  },

  verifyPayment(bookingId) {
    const list = getStoredBookings().map((b) =>
      Number(b.id) === Number(bookingId) ? { ...b, bookingStatus: 'CONFIRMED' } : b
    );
    writeLS(LS_KEYS.BOOKINGS, list);
    return list.find((b) => Number(b.id) === Number(bookingId)) || list[0];
  },

  cancelBooking(bookingId) {
    const list = getStoredBookings().map((b) =>
      Number(b.id) === Number(bookingId)
        ? { ...b, bookingStatus: 'CANCELLED', refundPending: true }
        : b
    );
    writeLS(LS_KEYS.BOOKINGS, list);
    return list.find((b) => Number(b.id) === Number(bookingId));
  },

  // Profile & My Reviews
  getProfile(fallbackUser) {
    const stored = readLS(LS_KEYS.PROFILE, null);
    return {
      id: fallbackUser?.id || 1,
      name: stored?.name || fallbackUser?.name || fallbackUser?.fullName || 'StayNest Member',
      email: stored?.email || fallbackUser?.email || 'admin@example.com',
      dateOfBirth: stored?.dateOfBirth || '1999-08-15',
      gender: stored?.gender || 'MALE',
      avatarUrl: stored?.avatarUrl || '',
      roles: fallbackUser?.roles || ['ADMIN', 'HOTEL_MANAGER', 'GUEST'],
    };
  },

  updateProfile(body) {
    const current = this.getProfile();
    const updated = { ...current, ...body };
    writeLS(LS_KEYS.PROFILE, updated);
    return updated;
  },

  getMyReviews(page = 0, size = 10) {
    const hotels = getStoredHotels();
    const items = [
      {
        id: 701,
        hotelId: hotels[0].id,
        hotelName: hotels[0].name,
        hotelCity: hotels[0].city,
        rating: 5,
        comment: 'Unforgettable oceanfront serenity and impeccable warm service.',
        createdAt: '2026-09-18T10:00:00Z',
      },
      {
        id: 702,
        hotelId: hotels[1].id,
        hotelName: hotels[1].name,
        hotelCity: hotels[1].city,
        rating: 5,
        comment: 'Spectacular cliffside views over Da Nang Bay — truly world class.',
        createdAt: '2026-08-05T14:20:00Z',
      },
    ];
    return paginate(items, page, size);
  },

  // Manager Console APIs
  listManagerHotels(q = {}) {
    return paginate(getStoredHotels(), q.page ?? 0, q.size ?? 50);
  },

  createHotel(body) {
    const list = getStoredHotels();
    const newHotel = {
      id: Date.now(),
      name: body.name || 'New Boutique Retreat',
      city: body.city || 'Da Nang',
      country: body.country || 'Vietnam',
      price: Number(body.price) || 5200,
      minPrice: Number(body.price) || 5200,
      averageRating: 4.9,
      reviewCount: 1,
      active: Boolean(body.active ?? true),
      photos:
        body.photos?.length > 0
          ? body.photos
          : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80&fit=crop'],
      amenities: body.amenities || ['Free Wi-Fi', 'Infinity Pool', 'Complimentary Breakfast'],
      contactInfo: body.contactInfo || {
        address: `${body.city || 'Da Nang'}, Vietnam`,
        phoneNumber: '+84 236 388 9999',
        email: 'concierge@staynest.com',
        location: '16.0544,108.2022',
      },
    };
    writeLS(LS_KEYS.HOTELS, [newHotel, ...list]);
    getRoomsByHotelId(newHotel.id);
    return newHotel;
  },

  updateHotel(hotelId, body) {
    let updated = null;
    const list = getStoredHotels().map((h) => {
      if (Number(h.id) === Number(hotelId)) {
        updated = { ...h, ...body, id: h.id };
        return updated;
      }
      return h;
    });
    writeLS(LS_KEYS.HOTELS, list);
    return updated || list[0];
  },

  deleteHotel(hotelId) {
    const list = getStoredHotels().filter((h) => Number(h.id) !== Number(hotelId));
    writeLS(LS_KEYS.HOTELS, list);
  },

  activateHotel(hotelId) {
    const list = getStoredHotels().map((h) =>
      Number(h.id) === Number(hotelId) ? { ...h, active: true } : h
    );
    writeLS(LS_KEYS.HOTELS, list);
  },

  createRoom(hotelId, body) {
    const map = getStoredRoomsMap();
    const id = Number(hotelId);
    const list = getRoomsByHotelId(id);
    const basePrice = Number(body.basePrice ?? body.price) || 4800;
    const created = {
      id: Date.now(),
      hotelId: id,
      type: body.type || 'Deluxe Sanctuary Suite',
      price: basePrice,
      basePrice,
      capacity: Number(body.capacity) || 2,
      totalCount: Number(body.totalCount) || 5,
      photos:
        body.photos?.length > 0
          ? body.photos
          : ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80&fit=crop'],
      amenities: body.amenities || ['King Bed', 'Rain Shower', 'Free Wi-Fi'],
    };
    map[id] = [...list, created];
    writeLS(LS_KEYS.ROOMS, map);
    return created;
  },

  updateRoom(hotelId, roomId, body) {
    const map = getStoredRoomsMap();
    const id = Number(hotelId);
    let updated = null;
    map[id] = getRoomsByHotelId(id).map((r) => {
      if (Number(r.id) === Number(roomId)) {
        const basePrice = Number(body.basePrice ?? body.price ?? r.basePrice);
        updated = { ...r, ...body, price: basePrice, basePrice, id: r.id };
        return updated;
      }
      return r;
    });
    writeLS(LS_KEYS.ROOMS, map);
    return updated;
  },

  deleteRoom(hotelId, roomId) {
    const map = getStoredRoomsMap();
    const id = Number(hotelId);
    map[id] = getRoomsByHotelId(id).filter((r) => Number(r.id) !== Number(roomId));
    writeLS(LS_KEYS.ROOMS, map);
  },

  getRoomInventory(roomId) {
    const invMap = readLS(LS_KEYS.INVENTORY, {});
    if (Array.isArray(invMap[roomId])) return invMap[roomId];
    const rows = Array.from({ length: 14 }, (_, idx) => ({
      id: Number(roomId) * 100 + idx,
      date: isoPlusDays(idx),
      bookedCount: idx % 3 === 0 ? 2 : 1,
      reservedCount: 0,
      totalCount: 6,
      surgeFactor: 1.0,
      price: 6850,
      closed: false,
    }));
    invMap[roomId] = rows;
    writeLS(LS_KEYS.INVENTORY, invMap);
    return rows;
  },

  updateRoomInventory(roomId, body) {
    const invMap = readLS(LS_KEYS.INVENTORY, {});
    const current = this.getRoomInventory(roomId);
    invMap[roomId] = current.map((row) => ({
      ...row,
      closed: body.closed ?? row.closed,
      surgeFactor: body.surgeFactor ?? row.surgeFactor,
    }));
    writeLS(LS_KEYS.INVENTORY, invMap);
  },

  getHotelBookings(hotelId, q = {}) {
    const all = getStoredBookings();
    const filtered = all.filter((b) => Number(b.hotel?.id) === Number(hotelId));
    return paginate(filtered.length > 0 ? filtered : all, q.page ?? 0, q.size ?? 20);
  },

  getRefundPending() {
    return getStoredBookings().filter(
      (b) => b.bookingStatus === 'CANCELLED' && b.refundPending !== false
    );
  },

  settleRefund(bookingId) {
    const list = getStoredBookings().map((b) =>
      Number(b.id) === Number(bookingId) ? { ...b, refundPending: false } : b
    );
    writeLS(LS_KEYS.BOOKINGS, list);
  },

  getHotelReport(hotelId) {
    const seed = (Number(hotelId) % 7) + 3;
    const totalConfirmedBookings = seed * 4;
    const avgRevenue = 16500 + seed * 1200;
    return {
      totalConfirmedBookings,
      totalRevenueOfConfirmedBookings: totalConfirmedBookings * avgRevenue,
      avgRevenue,
    };
  },
};
