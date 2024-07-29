import { Link } from 'react-router-dom';
import { PaginationProps } from '../types';

function Pagination({ paginateConfig }: PaginationProps) {
  return (
    <div className="paginate">
      <Link
        style={{
          fontSize: '3rem',
          pointerEvents: Number(paginateConfig.prevPage) < 1 ? 'none' : 'auto',
          opacity: Number(paginateConfig.prevPage) < 1 ? 0.1 : 1,
        }}
        type="button"
        to={
          paginateConfig.searchQuery
            ? `?page=${paginateConfig.prevPage}&search=${paginateConfig.searchQuery}`
            : `?page=${paginateConfig.prevPage}`
        }
      >
        👈
      </Link>
      {Array.from({ length: paginateConfig.maxPage }).map((_, id) => (
        <Link
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '4rem',
            width: '4rem',
            border: '1px solid #2b3035',
            borderRadius: '10px',
            fontSize: '3rem',
            color:
              id + 1 == Number(paginateConfig.nextPage) - 1
                ? '#adb5bd'
                : '#2b3035',
          }}
          to={
            paginateConfig.searchQuery
              ? `?page=${id + 1}&search=${paginateConfig.searchQuery}`
              : `?page=${id + 1}`
          }
          key={id + 1}
        >
          {id + 1}
        </Link>
      ))}
      <Link
        style={{
          fontSize: '3rem',
          cursor: 'pointer',
          pointerEvents:
            Number(paginateConfig.nextPage) > paginateConfig.maxPage
              ? 'none'
              : 'auto',
          opacity:
            Number(paginateConfig.nextPage) > paginateConfig.maxPage ? 0.1 : 1,
        }}
        type="button"
        to={
          paginateConfig.searchQuery
            ? `?page=${paginateConfig.nextPage}&search=${paginateConfig.searchQuery}`
            : `?page=${paginateConfig.nextPage}`
        }
      >
        👉
      </Link>
    </div>
  );
}

export default Pagination;
