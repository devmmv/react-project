import { renderHook } from '@testing-library/react';
import usePaginate from '../hooks/usePaginate';

describe('usePaginate hook', () => {
  let initialUrlSearchParams: URLSearchParams;

  beforeEach(() => {
    initialUrlSearchParams = new URLSearchParams();
    initialUrlSearchParams.set('page', '1');
    initialUrlSearchParams.set('search', 'a');
    localStorage.setItem('query', 'a');
  });

  it('should return initial pagination data', () => {
    const { result } = renderHook(() =>
      usePaginate(initialUrlSearchParams, 100),
    );

    expect(result.current).toEqual({
      nextPage: 2,
      prevPage: 0,
      count: 100,
      maxPage: 10,
      searchQuery: 'a',
    });
  });
  it('should update pagination data when query or count change', () => {
    const { result, rerender } = renderHook(
      ({ query, count }) => usePaginate(query, count),
      {
        initialProps: { query: initialUrlSearchParams, count: 100 },
      },
    );

    expect(result.current.nextPage).toBe(2);
    expect(result.current.prevPage).toBe(0);
    expect(result.current.maxPage).toBe(10);

    rerender({ query: initialUrlSearchParams, count: 50 });

    expect(result.current.nextPage).toBe(2);
    expect(result.current.prevPage).toBe(0);
    expect(result.current.maxPage).toBe(5);

    const updatedUrlSearchParams = new URLSearchParams();
    updatedUrlSearchParams.set('page', '3');
    updatedUrlSearchParams.set('search', 'test');
    rerender({ query: updatedUrlSearchParams, count: 50 });

    expect(result.current.nextPage).toBe(4);
    expect(result.current.prevPage).toBe(2);
    expect(result.current.maxPage).toBe(5);
  });
});
