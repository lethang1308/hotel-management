import { useState, useEffect, useCallback } from 'react';
import { getProfile, updateProfile } from '@/lib/api/users';

const PROFILE_EVENT = 'staynest:profile-changed';

export function useProfile() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const res = await getProfile();
      setData(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    if (typeof window === 'undefined') return undefined;
    window.addEventListener(PROFILE_EVENT, fetchProfile);
    return () => window.removeEventListener(PROFILE_EVENT, fetchProfile);
  }, [fetchProfile]);

  return { data, isLoading, isError, refetch: fetchProfile };
}

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const mutateAsync = async (body) => {
    setIsLoading(true);
    try {
      const res = await updateProfile(body);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(PROFILE_EVENT));
      }
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
