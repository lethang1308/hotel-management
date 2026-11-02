export const CURATED_CITIES = [
  { city: 'Da Nang', country: 'Vietnam', region: 'Central Coast' },
  { city: 'Hoi An', country: 'Vietnam', region: 'Central Coast' },
  { city: 'Phu Quoc', country: 'Vietnam', region: 'Southern Islands' },
  { city: 'Ha Long', country: 'Vietnam', region: 'Northern Bay' },
  { city: 'Sapa', country: 'Vietnam', region: 'Northern Highlands' },
  { city: 'Da Lat', country: 'Vietnam', region: 'Central Highlands' },
  { city: 'Nha Trang', country: 'Vietnam', region: 'South Central Coast' },
  { city: 'Hanoi', country: 'Vietnam', region: 'Northern Vietnam' },
  { city: 'Ho Chi Minh City', country: 'Vietnam', region: 'Southern Vietnam' },
  { city: 'Bali', country: 'Indonesia', region: 'Southeast Asia' },
  { city: 'Singapore', country: 'Singapore', region: 'Southeast Asia' },
  { city: 'Bangkok', country: 'Thailand', region: 'Southeast Asia' },
  { city: 'Phuket', country: 'Thailand', region: 'Southeast Asia' },
  { city: 'Kyoto', country: 'Japan', region: 'East Asia' },
  { city: 'Tokyo', country: 'Japan', region: 'East Asia' },
  { city: 'Seoul', country: 'South Korea', region: 'East Asia' },
  { city: 'Hong Kong', country: 'Hong Kong', region: 'East Asia' },
  { city: 'Maldives', country: 'Maldives', region: 'South Asia' },
  { city: 'Jaipur', country: 'India', region: 'South Asia' },
  { city: 'Goa', country: 'India', region: 'South Asia' },
  { city: 'Mumbai', country: 'India', region: 'South Asia' },
  { city: 'New Delhi', country: 'India', region: 'South Asia' },
  { city: 'Bangalore', country: 'India', region: 'South Asia' },
  { city: 'Dubai', country: 'UAE', region: 'Middle East' },
  { city: 'Abu Dhabi', country: 'UAE', region: 'Middle East' },
  { city: 'Istanbul', country: 'Türkiye', region: 'Middle East' },
  { city: 'Paris', country: 'France', region: 'Europe' },
  { city: 'London', country: 'United Kingdom', region: 'Europe' },
  { city: 'Rome', country: 'Italy', region: 'Europe' },
  { city: 'Venice', country: 'Italy', region: 'Europe' },
  { city: 'Barcelona', country: 'Spain', region: 'Europe' },
  { city: 'Santorini', country: 'Greece', region: 'Europe' },
  { city: 'Zurich', country: 'Switzerland', region: 'Europe' },
  { city: 'New York', country: 'United States', region: 'Americas' },
  { city: 'Los Angeles', country: 'United States', region: 'Americas' },
  { city: 'San Francisco', country: 'United States', region: 'Americas' },
  { city: 'Sydney', country: 'Australia', region: 'Oceania' },
];

export function filterCities(query, limit = 7) {
  const q = query.trim().toLowerCase();
  if (!q) return CURATED_CITIES.slice(0, limit);
  return CURATED_CITIES.filter(
    (c) =>
      c.city.toLowerCase().includes(q) ||
      c.country.toLowerCase().includes(q) ||
      (c.region?.toLowerCase().includes(q) ?? false)
  ).slice(0, limit);
}
