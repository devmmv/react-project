import { useEffect, useState } from 'react';
import { URLSearchParams } from 'url';

type PaginateType = {
  nextPage: number;
  prevPage: number;
  count: number;
  maxPage: number;
  searchQuery: string | null;
};

function usePaginate(query: URLSearchParams, count: number) {
  const [data, setData] = useState<PaginateType>({
    nextPage: 0,
    prevPage: 0,
    count: 0,
    maxPage: 1,
    searchQuery: localStorage.getItem('query'),
  });

  useEffect(() => {
    setData({
      nextPage: Number(query.get('page')) + 1,
      prevPage: Number(query.get('page')) - 1,
      count,
      maxPage: Math.ceil(count / 10),
      searchQuery: query.get('search'),
    });
  }, [query, count]);

  return data;
}
export default usePaginate;
