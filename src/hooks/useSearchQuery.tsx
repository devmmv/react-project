import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useSearchQuery(
  key = 'query',
): [query: string, setQuery: Dispatch<SetStateAction<string>>] {
  const [query, setQuery] = useState(() => localStorage.getItem(key) || '');

  useEffect(() => {
    localStorage.setItem(key, query);

    return () => {
      localStorage.setItem(key, query);
    };
  }, [key, query]);

  return [query, setQuery];
}
