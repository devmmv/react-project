import { Provider } from 'react-redux';
import { ItemType } from '../types';
import store from '../app/store/store';
import Item from '../components/Item';
import { fireEvent, render, screen } from '@testing-library/react';

const mockItem: ItemType = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  eye_color: 'blue',
  gender: 'male',
  hair_color: 'blond',
  height: '172',
  mass: '77',
  skin_color: 'fair',
  homeworld: 'http://swapi.dev/api/planets/1/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: '',
};

describe('Item component tests', () => {
  it('should render item details correctly', () => {
    const mockSetIsOpenInfo = vi.fn();
    const mockSetName = vi.fn();
    const mockSetPlanetNumber = vi.fn();

    render(
      <Provider store={store}>
        <Item
          item={mockItem}
          isOpenInfo={false}
          setIsOpenInfo={mockSetIsOpenInfo}
          setName={mockSetName}
          setPlanetNumber={mockSetPlanetNumber}
        />
      </Provider>,
    );

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair color:/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye color:/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth year:/i)).toBeInTheDocument();
  });
  it('should toggle checkbox and dispatch actions', () => {
    const mockSetIsOpenInfo = vi.fn();
    const mockSetName = vi.fn();
    const mockSetPlanetNumber = vi.fn();

    render(
      <Provider store={store}>
        <Item
          item={mockItem}
          isOpenInfo={false}
          setIsOpenInfo={mockSetIsOpenInfo}
          setName={mockSetName}
          setPlanetNumber={mockSetPlanetNumber}
        />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(store.getState().people['Luke Skywalker']).toBeDefined();
    fireEvent.click(checkbox);
    expect(store.getState().people['Luke Skywalker']).toBeUndefined();
  });

  it('should call setIsOpenInfo, setPlanetNumber, and setName when item is clicked', () => {
    const mockSetIsOpenInfo = vi.fn();
    const mockSetName = vi.fn();
    const mockSetPlanetNumber = vi.fn();

    render(
      <Provider store={store}>
        <Item
          item={mockItem}
          isOpenInfo={false}
          setIsOpenInfo={mockSetIsOpenInfo}
          setName={mockSetName}
          setPlanetNumber={mockSetPlanetNumber}
        />
      </Provider>,
    );

    const itemElement = screen.getByText(/Luke Skywalker/i);
    fireEvent.click(itemElement);

    expect(mockSetIsOpenInfo).toBeCalledWith(true);
    expect(mockSetName).toBeCalledWith('Luke Skywalker');
    expect(mockSetPlanetNumber).toBeCalledWith('1');
  });
});
