import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { render, screen } from '@testing-library/react';
import store from '../app/store/store';

vi.mock('../components/DisplaySection', () => () => (
  <div>DisplaySection Component</div>
));
vi.mock('../components/Info', () => () => <div>Info Component</div>);
vi.mock('../routes/error-page', () => () => <div>Error Page</div>);

test('render loading ', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
test('renders ErrorPage component on unknown route', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  );

  window.history.pushState({}, 'Test page', '/');

  expect(screen.getByText(/error/i)).toBeInTheDocument();
});
