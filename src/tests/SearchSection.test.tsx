/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';
import SearchSection from '../components/SearchSection';
import { fireEvent, render, screen } from '@testing-library/react';

vi.mock('../hooks/useSearchQuery.tsx', () => ({
  default: vi.fn(),
}));

describe('SearchSection Component', () => {
  it('should update search query on input change', () => {
    const setSearchQuery = vi.fn();
    (useSearchQuery as any).mockReturnValue(['', setSearchQuery]);

    render(
      <BrowserRouter>
        <SearchSection />
      </BrowserRouter>,
    );
    const searchInput = screen.getByPlaceholderText('Search by name...');

    expect(searchInput).toHaveValue('');

    fireEvent.change(searchInput, { target: { value: 'Luke Skywalker' } });

    expect(setSearchQuery).toHaveBeenCalledWith('Luke Skywalker');
  });
  it('should set query in localStorage on clicking Search link', () => {
    const setSearchQuery = vi.fn();

    (useSearchQuery as any).mockReturnValue(['Luke Skywalker', setSearchQuery]);

    render(
      <BrowserRouter>
        <SearchSection />
      </BrowserRouter>,
    );

    const searchLink = screen.getByText('Search');

    fireEvent.click(searchLink);

    expect(localStorage.getItem('query')).toBe('Luke Skywalker');
  });

  it('should throw an error when clicking Get error button', () => {
    const setSearchQuery = vi.fn();

    (useSearchQuery as any).mockReturnValue(['', setSearchQuery]);

    render(
      <BrowserRouter>
        <SearchSection />
      </BrowserRouter>,
    );

    const errorButton = screen.getByText('Get error');

    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => fireEvent.click(errorButton)).toThrow('Simulate Error!');
    consoleError.mockRestore();
  });
});
