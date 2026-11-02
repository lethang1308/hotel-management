import { readSession } from './auth';
import { apiGet, apiPatch } from './client';
import { mockHotelApi } from '@/services/mockHotelData';

const USE_LIVE = import.meta.env.VITE_ENABLE_HOTEL_API === 'true';
const PROFILE_PATH = '/users/profile';

export async function getProfile() {
  const session = readSession();
  if (USE_LIVE) {
    try {
      return await apiGet(PROFILE_PATH);
    } catch {
      return mockHotelApi.getProfile(session);
    }
  }
  return mockHotelApi.getProfile(session);
}

export async function updateProfile(body) {
  if (USE_LIVE) {
    try {
      await apiPatch(PROFILE_PATH, body);
      return;
    } catch {
      // fall through
    }
  }
  mockHotelApi.updateProfile(body);
}

export async function uploadProfilePhoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || '');
      mockHotelApi.updateProfile({ avatarUrl: dataUrl });
      resolve(dataUrl);
    };
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });
}
