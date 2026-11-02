import { mockHotelApi, getRoomsByHotelId } from '@/services/mockHotelData';

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Could not read uploaded photo'));
    reader.readAsDataURL(file);
  });
}

export async function listHotels(q = {}) {
  return mockHotelApi.listManagerHotels(q);
}

export async function createHotel(body) {
  return mockHotelApi.createHotel(body);
}

export async function updateHotel(hotelId, body) {
  return mockHotelApi.updateHotel(hotelId, body);
}

export async function deleteHotel(hotelId) {
  mockHotelApi.deleteHotel(hotelId);
}

export async function uploadHotelPhoto(_hotelId, file) {
  return readFileAsDataUrl(file);
}

export async function activateHotel(hotelId) {
  mockHotelApi.activateHotel(hotelId);
}

export async function listRooms(hotelId) {
  return getRoomsByHotelId(hotelId);
}

export async function createRoom(hotelId, body) {
  return mockHotelApi.createRoom(hotelId, body);
}

export async function updateRoom(hotelId, roomId, body) {
  return mockHotelApi.updateRoom(hotelId, roomId, body);
}

export async function deleteRoom(hotelId, roomId) {
  mockHotelApi.deleteRoom(hotelId, roomId);
}

export async function uploadRoomPhoto(_hotelId, _roomId, file) {
  return readFileAsDataUrl(file);
}

export async function getRoomInventory(roomId) {
  return mockHotelApi.getRoomInventory(roomId);
}

export async function updateRoomInventory(roomId, body) {
  mockHotelApi.updateRoomInventory(roomId, body);
}

export async function getHotelBookings(hotelId, q = {}) {
  return mockHotelApi.getHotelBookings(hotelId, q);
}

export async function getRefundPending() {
  return mockHotelApi.getRefundPending();
}

export async function settleRefund(bookingId) {
  mockHotelApi.settleRefund(bookingId);
}

export async function getHotelReport(hotelId, q = {}) {
  return mockHotelApi.getHotelReport(hotelId, q);
}
