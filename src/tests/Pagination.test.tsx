import { BrowserRouter } from 'react-router-dom';
import { PaginationProps } from '../types';
import Pagination from '../components/Pagination';
import { render, screen } from '@testing-library/react';

describe('Pagination', () => {
  const defaultPaginateConfig = {
    prevPage: 0,
    nextPage: 2,
    searchQuery: '',
    maxPage: 5,
    count: 0,
  };

  const renderPagination = (
    paginateConfig: PaginationProps['paginateConfig'],
  ) => {
    render(
      <BrowserRouter>
        <Pagination paginateConfig={paginateConfig} />
      </BrowserRouter>,
    );
  };

  it('should disable previous button on the first page', () => {
    renderPagination({
      ...defaultPaginateConfig,
      prevPage: 0,
      count: 80,
    });

    const prevButton = screen.getByText('👈');

    expect(prevButton).toHaveStyle('pointer-events: none');
    expect(prevButton).toHaveStyle('opacity: 0.1');
  });
  it('should enable and disable page buttons based on maxPage', () => {
    renderPagination(defaultPaginateConfig);

    for (let i = 1; i <= defaultPaginateConfig.maxPage; i++) {
      const pageButton = screen.getByText(i.toString());
      expect(pageButton).toBeInTheDocument();
    }
  });

  it('should disable next button on the last page', () => {
    renderPagination({
      ...defaultPaginateConfig,
      nextPage: defaultPaginateConfig.maxPage + 1,
      prevPage: defaultPaginateConfig.maxPage,
    });

    const nextButton = screen.getByText('👉');

    expect(nextButton).toHaveStyle('pointer-events: none');
    expect(nextButton).toHaveStyle('opacity: 0.1');
  });

  it('should construct correct URLs with and without search query', () => {
    renderPagination({
      ...defaultPaginateConfig,
      searchQuery: 'a',
    });

    const nextButton = screen.getByText('👉');
    expect(nextButton).toHaveAttribute('href', '/?page=2&search=a');

    const firstPageButton = screen.getByText('1');
    const secondPageButton = screen.getByText('2');
    expect(firstPageButton).toHaveAttribute('href', '/?page=1&search=a');
    expect(secondPageButton).toHaveAttribute('href', '/?page=2&search=a');
  });
});
