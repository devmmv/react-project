import { render, screen } from '@testing-library/react';
import DisplaySection from '../components/DisplaySection';
import { ItemType } from '../types';

const itemsMock = [{ name: 'Item 1' }, { name: 'Item 2' }] as ItemType[];

vi.mock('../components/ListItems.tsx', () => ({
  default: vi.fn(() => <div>ListItems Component</div>),
}));
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  Outlet: ({ context }: { context: { name: string } }) => (
    <div>Outlet Component {context.name}</div>
  ),
}));

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useOutletContext: () => itemsMock,
}));

it('renders ListItems when items are available', async () => {
  render(<DisplaySection />);
  const text = screen.getByText(/ListItems Component/i);
  expect(text).toBeInTheDocument();
});
