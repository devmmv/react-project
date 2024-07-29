import { useOutletContext } from 'react-router-dom';
import { useGetPlanetInfoQuery } from '../app/swApi';
import Info from '../components/Info';
import { screen, render, fireEvent } from '@testing-library/react';

vi.mock('../app/swApi.ts', () => ({
  useGetPlanetInfoQuery: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(),
}));

const mockedUseGetPlanetInfoQuery = useGetPlanetInfoQuery as ReturnType<
  typeof vi.fn
>;
const mockedUseOutletContext = useOutletContext as ReturnType<typeof vi.fn>;

describe('Info Component', () => {
  it('displays loading message when fetching data', () => {
    mockedUseOutletContext.mockReturnValue({
      planetNumber: 1,
      name: 'Tatooine',
      setIsOpenInfo: vi.fn(),
    });

    mockedUseGetPlanetInfoQuery.mockReturnValue({
      data: null,
      isFetching: true,
    });

    render(<Info />);

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it('calls setIsOpenInfo with false when Close button is clicked', () => {
    const setIsOpenInfoMock = vi.fn();
    mockedUseOutletContext.mockReturnValue({
      planetNumber: 1,
      name: 'Tatooine',
      setIsOpenInfo: setIsOpenInfoMock,
    });

    mockedUseGetPlanetInfoQuery.mockReturnValue({
      data: {
        name: 'Tatooine',
        climate: 'arid',
        population: '200000',
        diameter: '10465',
        surface_water: '1',
        terrain: 'desert',
        gravity: '1 standard',
        orbital_period: '304',
        rotation_period: '23',
      },
      isFetching: false,
    });

    render(<Info />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(setIsOpenInfoMock).toHaveBeenCalledWith(false);
  });
});
