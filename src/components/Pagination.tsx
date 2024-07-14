import { Link } from 'react-router-dom';
import { PaginationProps } from '../types';

function Pagination({ data, setIsLoaded }: PaginationProps) {
  return (
    <div className="paginate">
      <Link
        onClick={() => setIsLoaded(false)}
        style={{
          fontSize: '3rem',
          pointerEvents: Number(data.prevPage) < 1 ? 'none' : 'auto',
          opacity: Number(data.prevPage) < 1 ? 0.1 : 1,
        }}
        type="button"
        to={
          data.searchQuery
            ? `?page=${data.prevPage}&search=${data.searchQuery}`
            : `?page=${data.prevPage}`
        }
      >
        👈
      </Link>
      {Array.from({ length: data.maxPage }).map((_, id) => (
        <Link
          onClick={() => setIsLoaded(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '4rem',
            width: '4rem',
            border: '1px solid #2b3035',
            borderRadius: '10px',
            fontSize: '3rem',
            color: id + 1 == Number(data.nextPage) - 1 ? '#adb5bd' : '#2b3035',
          }}
          to={
            data.searchQuery
              ? `?page=${id + 1}&search=${data.searchQuery}`
              : `?page=${id + 1}`
          }
          key={id + 1}
        >
          {id + 1}
        </Link>
      ))}
      <Link
        onClick={() => setIsLoaded(false)}
        style={{
          fontSize: '3rem',
          cursor: 'pointer',
          pointerEvents: Number(data.nextPage) > data.maxPage ? 'none' : 'auto',
          opacity: Number(data.nextPage) > data.maxPage ? 0.1 : 1,
        }}
        type="button"
        to={
          data.searchQuery
            ? `?page=${data.nextPage}&search=${data.searchQuery}`
            : `?page=${data.nextPage}`
        }
      >
        👉
      </Link>
    </div>
  );
}

export default Pagination;
