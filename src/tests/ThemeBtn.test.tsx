import { fireEvent, render, screen } from '@testing-library/react';
import UseTheme from '../contexts/theme';
import ThemeBtn from '../components/ThemeBtn';

vi.mock('../contexts/theme.tsx', () => ({
  default: vi.fn(),
}));

describe('ThemeBtn Component', () => {
  it('should toggle theme on checkbox change', () => {
    const setLightTheme = vi.fn();
    const setDarkTheme = vi.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (UseTheme as any).mockReturnValue({
      themeMode: 'light',
      setLightTheme,
      setDarkTheme,
    });

    render(<ThemeBtn />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(setDarkTheme).toHaveBeenCalled();
    expect(setLightTheme).not.toHaveBeenCalled();
  });
});
