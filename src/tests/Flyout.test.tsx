import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Flyout from '../components/Flyout';

const mockStore = configureStore([]);

describe('Flyout component tests', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    store = mockStore({
      people: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          eye_color: 'blue',
          gender: 'male',
          hair_color: 'blond',
          height: '172',
          mass: '77',
          skin_color: 'fair',
          homeworld: 'http://swapi.dev/api/planets/1/',
        },
      ],
    });

    store.dispatch = vi.fn();
  });

  it('should display the correct number of people in the store', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
