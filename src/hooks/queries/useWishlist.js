import { useState, useEffect, useCallback, useMemo } from 'react';
import { addToWishlist, getWishlist, removeFromWishlist } from '@/lib/api/wishlist';
import { emitAuthRequired } from '@/lib/api/client';
import { useAuth } from '@/hooks/useAuth';

const WISHLIST_EVENT = 'staynest:wishlist-changed';

export function useWishlist(q = {}) {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setData(null);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getWishlist(q);
      setData(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, q.page, q.size]);

  useEffect(() => {
    fetchWishlist();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(WISHLIST_EVENT, fetchWishlist);
    return () => window.removeEventListener(WISHLIST_EVENT, fetchWishlist);
  }, [fetchWishlist]);

  return { data, isLoading, isError, refetch: fetchWishlist };
}

export function useWishlistIds() {
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIds = useCallback(() => {
    if (!isAuthenticated) {
      setData(null);
      return;
    }
    setIsLoading(true);
    getWishlist({ page: 0, size: 500 })
      .then(setData)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [isAuthenticated]);

  useEffect(() => {
    fetchIds();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(WISHLIST_EVENT, fetchIds);
    return () => window.removeEventListener(WISHLIST_EVENT, fetchIds);
  }, [fetchIds]);

  const ids = useMemo(() => {
    const set = new Set();
    for (const h of data?.content ?? []) set.add(h.id);
    return set;
  }, [data]);

  return { ids, isLoading };
}

export function useToggleWishlist() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const mutateAsync = async ({ hotelId, next }) => {
    if (!isAuthenticated) {
      emitAuthRequired();
      throw new Error('Please sign in to save stays.');
    }
    setIsLoading(true);
    try {
      if (next) await addToWishlist(hotelId);
      else await removeFromWishlist(hotelId);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(WISHLIST_EVENT));
      }
      return { hotelId, next };
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
