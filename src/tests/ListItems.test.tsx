import { render, screen } from '@testing-library/react';
import ListItems from '../components/ListItems';
import { ItemType } from '../types';
import { Provider } from 'react-redux';
import store from '../app/store/store';

describe('ListItem', () => {
  it('should render the  number of cards equals items length', async () => {
    const items = [{ name: 'one' }, { name: 'two' }] as ItemType[];
    render(
      <Provider store={store}>
        <ListItems
          items={items}
          setName={vi.fn()}
          setIsOpenInfo={vi.fn()}
          isOpenInfo={false}
          setPlanetNumber={vi.fn()}
        />
      </Provider>,
    );
    const itemsList = await screen.findAllByRole('listitem');
    expect(itemsList).toHaveLength(items.length);
  });
  it('should render text "No cards" if items = []', () => {
    const items = [] as ItemType[];
    render(
      <Provider store={store}>
        <ListItems
          items={items}
          setName={vi.fn()}
          setIsOpenInfo={vi.fn()}
          isOpenInfo={false}
          setPlanetNumber={vi.fn()}
        />
      </Provider>,
    );
    const itemsList = screen.queryByRole('list');
    const text = screen.getByText(/no cards/i);
    expect(text).toBeInTheDocument();
    expect(itemsList).not.toBeInTheDocument();
  });
});
