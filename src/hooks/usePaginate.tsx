import { useEffect, useRef, useState } from 'react';
import { URLSearchParams } from 'url';
import { DataType, ItemType } from '../types';
import { URL } from '../constants';

function usePaginate(query: URLSearchParams) {
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
  const urlRef = useRef('');
  urlRef.current = `${URL}?${query.toString()}`;

  if (localStorage.getItem('query') && !query.toString())
    urlRef.current = `${URL}?page=1&search=${localStorage.getItem('query')}`;

  useEffect(() => {
    const fetchURL = urlRef.current;

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
  }, [query]);

  return data;
}
export default usePaginate;
