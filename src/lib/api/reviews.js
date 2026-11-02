import { apiGet } from './client';
import { mockHotelApi } from '@/services/mockHotelData';

const USE_LIVE = import.meta.env.VITE_ENABLE_HOTEL_API === 'true';

export async function getMyReviews(page = 0, size = 10) {
  if (USE_LIVE) {
    try {
      return await apiGet('/users/myReviews', { page, size });
    } catch {
      return mockHotelApi.getMyReviews(page, size);
    }
  }
  return mockHotelApi.getMyReviews(page, size);
}
