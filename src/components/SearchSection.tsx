import { ChangeEvent, useState } from 'react';
import useSearchQuery from '../hooks/useSearchQuery';
import { Link } from 'react-router-dom';

function SearchSection() {
  const [searhQuery, setSearchQuery] = useSearchQuery('query');
  const [hasError, setHasError] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (hasError) throw new Error('Simulate Error!');
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🤟</span>
        <h1>StarWars</h1>
      </div>

      <input
        className="search"
        autoFocus
        type="text"
        placeholder="Search by name..."
        value={searhQuery}
        onChange={handleSearchChange}
      />
      <div className="buttons-box">
        <Link
          to={searhQuery ? `?page=1&search=${searhQuery}` : '?page=1'}
          className="btn"
          onClick={() => {
            localStorage.setItem('query', searhQuery);
          }}
        >
          Search
        </Link>
        <button className="btn" onClick={() => setHasError(true)}>
          Get error
        </button>
      </div>
    </nav>
  );
}
export default SearchSection;
