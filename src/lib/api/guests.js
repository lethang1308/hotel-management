import { apiGet, apiPost, apiPut, apiDelete } from './client';
import { mockHotelApi } from '@/services/mockHotelData';

const USE_LIVE = import.meta.env.VITE_ENABLE_HOTEL_API === 'true';
const BASE = '/users/guests';

export async function listGuests(q = {}) {
  if (USE_LIVE) {
    try {
      return await apiGet(BASE, {
        page: q.page ?? 0,
        size: q.size ?? 20,
        sort: q.sort ?? 'id,desc',
      });
    } catch {
      return mockHotelApi.listGuests(q);
    }
  }
  return mockHotelApi.listGuests(q);
}

export async function createGuest(body) {
  if (USE_LIVE) {
    try {
      return await apiPost(BASE, body);
    } catch {
      return mockHotelApi.createGuest(body);
    }
  }
  return mockHotelApi.createGuest(body);
}

export async function updateGuest(id, body) {
  if (USE_LIVE) {
    try {
      await apiPut(`${BASE}/${id}`, body);
      return;
    } catch {
      // fall through
    }
  }
  mockHotelApi.updateGuest(id, body);
}

export async function deleteGuest(id) {
  if (USE_LIVE) {
    try {
      await apiDelete(`${BASE}/${id}`);
      return;
    } catch {
      // fall through
    }
  }
  mockHotelApi.deleteGuest(id);
}
