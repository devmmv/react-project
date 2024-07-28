import { ItemType } from './types';
import ErrorBoundary from './components/ErrorBoundary';
import { Outlet, useSearchParams } from 'react-router-dom';
import usePaginate from './hooks/usePaginate';
import Pagination from './components/Pagination';
import { useGetPeoplesQuery } from './app/swApi';
import { useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/theme';
import ThemeBtn from './components/ThemeBtn';
import SearchSection from './components/SearchSection';
import { useSelector } from 'react-redux';
import Flyout from './components/Flyout';
import { RootState } from './app/store/store';

function App() {
  const [searchParams] = useSearchParams();
  const { data: d = [], isFetching } = useGetPeoplesQuery(
    searchParams.toString(),
  );
  const data = usePaginate(searchParams, d.count);
  const [themeMode, setThemeMode] = useState('dark');
  const peoplesLength = useSelector((state: RootState) => state.people.length);

  const setDarkTheme = () => {
    setThemeMode('dark');
  };
  const setLightTheme = () => {
    setThemeMode('light');
  };

  useEffect(() => {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(themeMode);
  }, [themeMode]);

  const htmlElement = document.querySelector('html');
  htmlElement?.classList.remove('light', 'dark');
  htmlElement?.classList.add('dark');

  return (
    <ErrorBoundary>
      <ThemeProvider value={{ themeMode, setLightTheme, setDarkTheme }}>
        <div>
          <SearchSection />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Pagination data={data} />

            <ThemeBtn />
          </div>
          {isFetching ? (
            <div className="loader-box">
              <div className="loader"></div>
              <span className="loader-text">Loading...</span>
            </div>
          ) : (
            <>
              <Outlet context={d.results satisfies ItemType[]} />
            </>
          )}
        </div>
        {peoplesLength && <Flyout />}
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
