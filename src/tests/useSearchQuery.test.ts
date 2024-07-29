import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useSearchQuery from '../hooks/useSearchQuery';

describe('useSearchQuery hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with value from localStorage', () => {
    localStorage.setItem('query', 'test');
    const { result } = renderHook(() => useSearchQuery());

    expect(result.current[0]).toBe('test');
  });

  it('updates localStorage when query changes', () => {
    const { result } = renderHook(() => useSearchQuery());

    act(() => {
      result.current[1]('new test value');
    });

    expect(localStorage.getItem('query')).toBe('new test value');
  });

  it('handles unmounting correctly', () => {
    const { result, unmount } = renderHook(() => useSearchQuery());

    act(() => {
      result.current[1]('another test value');
    });

    unmount();

    expect(localStorage.getItem('query')).toBe('another test value');
  });

  it('correctly sets initial state to empty string when localStorage is empty', () => {
    const { result } = renderHook(() => useSearchQuery());

    expect(result.current[0]).toBe('');
  });
});
