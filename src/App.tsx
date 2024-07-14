import { useEffect, useState } from 'react';
import SearchSection from './components/SearchSection';
import { ItemType } from './types';
import ErrorBoundary from './components/ErrorBoundary';
import { Outlet, useSearchParams } from 'react-router-dom';
import usePaginate from './hooks/usePaginate';
import Pagination from './components/Pagination';

// const u = 'https://swapi.dev/api/people/';
function App() {
  const [items, setItems] = useState<ItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [searchParams] = useSearchParams();
  const data = usePaginate(searchParams);

  useEffect(() => {
    setItems(data.items);
    setIsLoaded(data.isLoaded);
  }, [data.isLoaded, data.items]);

  const handleStateItems = (items: ItemType[]) => {
    setItems(items);
  };
  const handleStateIsLoaded = (isLoaded: boolean) => {
    setIsLoaded(isLoaded);
  };

  return (
    <ErrorBoundary>
      <SearchSection
        parentStateItems={handleStateItems}
        parentStateIsLoaded={handleStateIsLoaded}
      />
      <Pagination setIsLoaded={setIsLoaded} data={data} />
      {!isLoaded ? (
        <div className="loader-box">
          <div className="loader"></div>
          <span className="loader-text">Loading...</span>
        </div>
      ) : (
        <>
          <Outlet context={items satisfies ItemType[]} />
        </>
      )}
    </ErrorBoundary>
  );
}

export default App;
