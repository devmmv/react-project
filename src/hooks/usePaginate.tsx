import { useEffect, useState } from 'react';
import { URLSearchParams } from 'url';
import { ItemType } from '../types';

export type DataType = {
  nextPage?: number;
  prevPage?: number;
  items: ItemType[];
  pageQuery?: string | null;
  searchQuery?: string | null;
  query?: string;
  count?: number;
  maxPage: number;

  isLoaded: boolean;
};
function usePaginate(url: string, query: URLSearchParams) {
  const [data, setData] = useState<DataType>({
    nextPage: 0,
    prevPage: 0,
    items: [],
    pageQuery: '',
    searchQuery: localStorage.getItem('query') || '',
    isLoaded: false,
    query: query.toString(),
    count: 0,
    maxPage: 1,
  });

  useEffect(() => {
    const fetchURL =
      query.toString() && localStorage.getItem('query')
        ? `${url}?${query.toString()}`
        : `${url}?page=1&search=${localStorage.getItem('query')}`;

    fetch(fetchURL)
      .then((res) => res.json())
      .then(({ results, count }: { results: ItemType[]; count: number }) => {
        setData({
          items: results,
          isLoaded: true,
          searchQuery: localStorage.getItem('query'),
          nextPage: Number(query.get('page')) + 1,
          prevPage: Number(query.get('page')) - 1,
          count,
          maxPage: Math.ceil(count / 10),
        });
      })
      .catch((err: Error) => console.error(err));
  }, [data.pageQuery, query, url]);

  return data;
}

export default usePaginate;
