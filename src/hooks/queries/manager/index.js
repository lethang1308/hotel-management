import { useState, useEffect, useCallback } from 'react';
import {
  activateHotel,
  createHotel,
  createRoom,
  deleteHotel,
  deleteRoom,
  getHotelBookings,
  getHotelReport,
  getRefundPending,
  getRoomInventory,
  listHotels,
  listRooms,
  settleRefund,
  updateHotel,
  updateRoom,
  updateRoomInventory,
  uploadHotelPhoto,
  uploadRoomPhoto,
} from '@/lib/api/admin';
import { useAuth } from '@/hooks/useAuth';

const MANAGER_EVENT = 'staynest:manager-changed';

function notifyManagerChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(MANAGER_EVENT));
  }
}

function useActionMutation(actionFn) {
  const [isLoading, setIsLoading] = useState(false);
  const mutateAsync = async (arg) => {
    setIsLoading(true);
    try {
      const res = await actionFn(arg);
      notifyManagerChanged();
      return res;
    } finally {
      setIsLoading(false);
    }
  };
  const mutate = (vars, opts) => {
    mutateAsync(vars)
      .then((res) => opts?.onSuccess?.(res))
      .catch((err) => opts?.onError?.(err));
  };
  return { mutateAsync, mutate, isLoading, isPending: isLoading };
}

function useIsManager() {
  const { session } = useAuth();
  return (
    !!session?.roles?.includes('HOTEL_MANAGER') ||
    !!session?.roles?.includes('ADMIN')
  );
}

export function useManagerHotels(q = {}) {
  const isManager = useIsManager();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchHotels = useCallback(async () => {
    if (!isManager) return;
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await listHotels(q);
      setData(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isManager, q.page, q.size]);

  useEffect(() => {
    fetchHotels();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(MANAGER_EVENT, fetchHotels);
    return () => window.removeEventListener(MANAGER_EVENT, fetchHotels);
  }, [fetchHotels]);

  return { data, isLoading, isError, refetch: fetchHotels };
}

export function useManagerHotel(hotelId) {
  const isManager = useIsManager();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHotel = useCallback(async () => {
    if (!isManager || !hotelId) return;
    setIsLoading(true);
    try {
      const page = await listHotels({ page: 0, size: 100 });
      setData(page.content.find((h) => Number(h.id) === Number(hotelId)) ?? null);
    } catch {
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [isManager, hotelId]);

  useEffect(() => {
    fetchHotel();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(MANAGER_EVENT, fetchHotel);
    return () => window.removeEventListener(MANAGER_EVENT, fetchHotel);
  }, [fetchHotel]);

  return { data, isLoading, refetch: fetchHotel };
}

export function useCreateHotel() {
  return useActionMutation((body) => createHotel(body));
}

export function useUpdateHotel(hotelId) {
  return useActionMutation((body) => updateHotel(hotelId, body));
}

export function useDeleteHotel() {
  return useActionMutation((hotelId) => deleteHotel(hotelId));
}

export function useActivateHotel(hotelId) {
  return useActionMutation(() => activateHotel(hotelId));
}

export function useUploadHotelPhoto(hotelId) {
  return useActionMutation((file) => uploadHotelPhoto(hotelId, file));
}

export function useManagerRooms(hotelId) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRooms = useCallback(async () => {
    if (!hotelId) return;
    setIsLoading(true);
    try {
      const res = await listRooms(hotelId);
      setData(res);
    } catch {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [hotelId]);

  useEffect(() => {
    fetchRooms();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(MANAGER_EVENT, fetchRooms);
    return () => window.removeEventListener(MANAGER_EVENT, fetchRooms);
  }, [fetchRooms]);

  return { data, isLoading, refetch: fetchRooms };
}

export function useCreateRoom(hotelId) {
  return useActionMutation((body) => createRoom(hotelId, body));
}

export function useUpdateRoom(hotelId) {
  return useActionMutation(({ roomId, body }) => updateRoom(hotelId, roomId, body));
}

export function useDeleteRoom(hotelId) {
  return useActionMutation((roomId) => deleteRoom(hotelId, roomId));
}

export function useUploadRoomPhoto(hotelId) {
  return useActionMutation(({ roomId, file }) => uploadRoomPhoto(hotelId, roomId, file));
}

export function useRoomInventory(roomId) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInventory = useCallback(async () => {
    if (!roomId) return;
    setIsLoading(true);
    try {
      const res = await getRoomInventory(roomId);
      setData(res);
    } catch {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchInventory();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(MANAGER_EVENT, fetchInventory);
    return () => window.removeEventListener(MANAGER_EVENT, fetchInventory);
  }, [fetchInventory]);

  return { data, isLoading, refetch: fetchInventory };
}

export function useUpdateInventory(roomId) {
  return useActionMutation((body) => updateRoomInventory(roomId, body));
}

export function useManagerBookings(hotelId, q = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    if (!hotelId) return;
    setIsLoading(true);
    try {
      const res = await getHotelBookings(hotelId, q);
      setData(res);
    } catch {
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [hotelId, q.page, q.size]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return { data, isLoading, refetch: fetchBookings };
}

export function useRefundPending() {
  const isManager = useIsManager();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRefunds = useCallback(async () => {
    if (!isManager) return;
    setIsLoading(true);
    try {
      const res = await getRefundPending();
      setData(res);
    } catch {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [isManager]);

  useEffect(() => {
    fetchRefunds();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(MANAGER_EVENT, fetchRefunds);
    return () => window.removeEventListener(MANAGER_EVENT, fetchRefunds);
  }, [fetchRefunds]);

  return { data, isLoading, refetch: fetchRefunds };
}

export function useSettleRefund() {
  return useActionMutation((bookingId) => settleRefund(bookingId));
}

export function useHotelReport(hotelId, q = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReport = useCallback(async () => {
    if (!hotelId) return;
    setIsLoading(true);
    try {
      const res = await getHotelReport(hotelId, q);
      setData(res);
    } catch {
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [hotelId, q.startDate, q.endDate]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  return { data, isLoading, refetch: fetchReport };
}
