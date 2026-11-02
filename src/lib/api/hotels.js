import { apiGet, apiPost } from './client';
import { mockHotelApi } from '@/services/mockHotelData';

const USE_LIVE = import.meta.env.VITE_ENABLE_HOTEL_API === 'true';

export async function listCuratedHotels(params, init) {
  if (USE_LIVE) {
    try {
      return await apiGet('/hotels', params, init);
    } catch {
      return mockHotelApi.listCurated(params);
    }
  }
  return mockHotelApi.listCurated(params);
}

export async function searchHotels(params, init) {
  if (USE_LIVE) {
    try {
      return await apiGet('/hotels/search', params, init);
    } catch {
      return mockHotelApi.searchHotels(params);
    }
  }
  return mockHotelApi.searchHotels(params);
}

export async function searchHotelsNL(body, init) {
  if (USE_LIVE) {
    try {
      return await apiPost('/hotels/search/nl', body, init);
    } catch {
      return mockHotelApi.searchHotelsNL(body);
    }
  }
  return mockHotelApi.searchHotelsNL(body);
}

export async function getHotelInfo(hotelId, params, init) {
  if (USE_LIVE) {
    try {
      return await apiGet(`/hotels/${hotelId}/info`, params, init);
    } catch {
      return mockHotelApi.getHotelInfo(hotelId);
    }
  }
  return mockHotelApi.getHotelInfo(hotelId);
}

export async function getHotelReviews(hotelId, page = 0, size = 10, init) {
  if (USE_LIVE) {
    try {
      return await apiGet(`/hotels/${hotelId}/reviews`, { page, size }, init);
    } catch {
      return mockHotelApi.getHotelReviews(hotelId, page, size);
    }
  }
  return mockHotelApi.getHotelReviews(hotelId, page, size);
}

export async function askHotelQuestion(hotelId, question, init) {
  if (USE_LIVE) {
    try {
      return await apiGet(`/hotels/${hotelId}/ask`, { question }, init);
    } catch {
      return mockHotelApi.askHotelQuestion(hotelId, question);
    }
  }
  return mockHotelApi.askHotelQuestion(hotelId, question);
}
