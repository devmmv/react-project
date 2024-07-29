import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../routes/error-page';
import DisplaySection from '../components/DisplaySection';
import Info from '../components/Info';
import store from '../app/store/store';

describe('App Routing', () => {
  const routes = [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <DisplaySection />,
          children: [{ path: '/', element: <Info /> }],
        },
      ],
    },
  ];

  it('should render the App component and navigate properly', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(screen.getByText(/🤟/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('should render the ErrorPage component on error', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/not-found'],
    });

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(screen.getByText(/sorry/i)).toBeInTheDocument();
  });
});
