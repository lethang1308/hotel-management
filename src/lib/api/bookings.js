import { apiGet, apiPost } from './client';
import { mockHotelApi } from '@/services/mockHotelData';

const USE_LIVE = import.meta.env.VITE_ENABLE_HOTEL_API === 'true';

export async function getMyBookings(q = {}) {
  if (USE_LIVE) {
    try {
      const raw = await apiGet('/users/myBookings', {
        page: q.page ?? 0,
        size: q.size ?? 50,
      });
      if (Array.isArray(raw)) {
        const size = q.size ?? raw.length;
        return {
          content: raw,
          totalElements: raw.length,
          totalPages: 1,
          number: 0,
          size,
          first: true,
          last: true,
          empty: raw.length === 0,
          numberOfElements: raw.length,
        };
      }
      return raw;
    } catch {
      return mockHotelApi.getMyBookings(q);
    }
  }
  return mockHotelApi.getMyBookings(q);
}

export async function initBooking(body) {
  if (USE_LIVE) {
    try {
      return await apiPost('/bookings/init', body);
    } catch {
      return mockHotelApi.initBooking(body);
    }
  }
  return mockHotelApi.initBooking(body);
}

export async function addBookingGuests(bookingId, guestIds) {
  if (USE_LIVE) {
    try {
      return await apiPost(`/bookings/${bookingId}/addGuests`, guestIds);
    } catch {
      return mockHotelApi.addBookingGuests(bookingId, guestIds);
    }
  }
  return mockHotelApi.addBookingGuests(bookingId, guestIds);
}

export async function initiatePayment(bookingId) {
  if (USE_LIVE) {
    try {
      return await apiPost(`/bookings/${bookingId}/payments`, {});
    } catch {
      return mockHotelApi.initiatePayment(bookingId);
    }
  }
  return mockHotelApi.initiatePayment(bookingId);
}

export async function getBookingStatus(bookingId) {
  if (USE_LIVE) {
    try {
      return await apiGet(`/bookings/${bookingId}/status`);
    } catch {
      return mockHotelApi.getBookingStatus(bookingId);
    }
  }
  return mockHotelApi.getBookingStatus(bookingId);
}

export async function getBooking(bookingId) {
  if (USE_LIVE) {
    try {
      return await apiGet(`/bookings/${bookingId}`);
    } catch {
      return mockHotelApi.getBooking(bookingId);
    }
  }
  return mockHotelApi.getBooking(bookingId);
}

export async function cancelBooking(bookingId) {
  if (USE_LIVE) {
    try {
      return await apiPost(`/bookings/${bookingId}/cancel`, {});
    } catch {
      return mockHotelApi.cancelBooking(bookingId);
    }
  }
  return mockHotelApi.cancelBooking(bookingId);
}

export async function verifyPayment(bookingId, sessionId) {
  if (USE_LIVE) {
    try {
      return await apiPost(
        `/bookings/${bookingId}/verify-payment?sessionId=${encodeURIComponent(sessionId || '')}`,
        {}
      );
    } catch {
      return mockHotelApi.verifyPayment(bookingId);
    }
  }
  return mockHotelApi.verifyPayment(bookingId);
}
