import { apiDelete, apiGet, apiPost } from './client';
import { mockHotelApi } from '@/services/mockHotelData';

const USE_LIVE = import.meta.env.VITE_ENABLE_HOTEL_API === 'true';
const WISHLIST_PATH = '/users/wishlist';

export async function getWishlist(q = {}) {
  if (USE_LIVE) {
    try {
      return await apiGet(WISHLIST_PATH, { page: q.page ?? 0, size: q.size ?? 24 });
    } catch {
      return mockHotelApi.getWishlist(q);
    }
  }
  return mockHotelApi.getWishlist(q);
}

export async function addToWishlist(hotelId) {
  if (USE_LIVE) {
    try {
      await apiPost(`${WISHLIST_PATH}/${hotelId}`, {});
      return;
    } catch {
      // fall through to mock
    }
  }
  mockHotelApi.addToWishlist(hotelId);
}

export async function removeFromWishlist(hotelId) {
  if (USE_LIVE) {
    try {
      await apiDelete(`${WISHLIST_PATH}/${hotelId}`);
      return;
    } catch {
      // fall through to mock
    }
  }
  mockHotelApi.removeFromWishlist(hotelId);
}
