import { useState, useEffect, useCallback } from 'react';
import { createGuest, deleteGuest, listGuests, updateGuest } from '@/lib/api/guests';

const GUESTS_EVENT = 'staynest:guests-changed';

function notifyGuestsChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(GUESTS_EVENT));
  }
}

export function useGuests(q = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchGuests = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await listGuests(q);
      setData(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [q.page, q.size, q.sort]);

  useEffect(() => {
    fetchGuests();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(GUESTS_EVENT, fetchGuests);
    return () => window.removeEventListener(GUESTS_EVENT, fetchGuests);
  }, [fetchGuests]);

  return {
    data,
    isLoading,
    isError,
    refetch: fetchGuests,
  };
}

export function useCreateGuest() {
  const [isLoading, setIsLoading] = useState(false);
  const mutateAsync = async (body) => {
    setIsLoading(true);
    try {
      const res = await createGuest(body);
      notifyGuestsChanged();
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

export function useUpdateGuest() {
  const [isLoading, setIsLoading] = useState(false);
  const mutateAsync = async ({ id, body }) => {
    setIsLoading(true);
    try {
      const res = await updateGuest(id, body);
      notifyGuestsChanged();
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

export function useDeleteGuest() {
  const [isLoading, setIsLoading] = useState(false);
  const mutateAsync = async (id) => {
    setIsLoading(true);
    try {
      const res = await deleteGuest(id);
      notifyGuestsChanged();
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
