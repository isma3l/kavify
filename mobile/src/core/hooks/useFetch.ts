import { useCallback, useEffect, useState } from 'react';

type Status<T> =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'success'; data: T }
  | { type: 'error'; message: string; cause?: unknown };

export function useFetch<T>(fetcher: () => Promise<T>, options: { inmediate?: boolean } = {}) {
  const [status, setStatus] = useState<Status<T>>({ type: 'idle' });

  const execute = useCallback(async () => {
    try {
      setStatus({ type: 'loading' });
      const data = await fetcher();
      setStatus({ type: 'success', data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setStatus({ type: 'error', message });
    }
  }, [fetcher]);

  useEffect(() => {
    if (options.inmediate) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.inmediate]);

  return {
    status,
    execute,
  };
}
