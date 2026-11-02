import { useState } from 'react';
import { uploadProfilePhoto } from '@/lib/api/users';

export function useUploadAvatar() {
  const [isLoading, setIsLoading] = useState(false);
  const mutateAsync = async (file) => {
    setIsLoading(true);
    try {
      const url = await uploadProfilePhoto(file);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('staynest:profile-changed'));
      }
      return url;
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
