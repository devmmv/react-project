import { ItemType, SearchSectionProps } from '../types';
import { URL } from '../constants';
import { ChangeEvent, useState } from 'react';
import useSearchQuery from '../hooks/useSearchQuery';
import { Link } from 'react-router-dom';

function SearchSection({
  parentStateItems,
  parentStateIsLoaded,
}: SearchSectionProps) {
  const [searhQuery, setSearchQuery] = useSearchQuery('query');
  const [hasError, setHasError] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const sendItemsToParent = (items: ItemType[]) => {
    parentStateItems(items);
  };
  const sendIsLoadedToParent = (state: boolean) => {
    parentStateIsLoaded(state);
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
            sendIsLoadedToParent(false);
            fetch(`${URL}?page=1&search=${searhQuery}`)
              .then((res) => res.json())
              .then((json) => {
                sendItemsToParent(json.results);
                sendIsLoadedToParent(true);
              });
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
