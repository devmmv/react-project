import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UseTheme, { ThemeProvider } from '../contexts/theme';

function MockComponent() {
  const { themeMode, setDarkTheme, setLightTheme } = UseTheme();

  return (
    <div>
      <span>{themeMode}</span>
      <button onClick={setDarkTheme}>Dark</button>
      <button onClick={setLightTheme}>Light</button>
    </div>
  );
}

describe('useTheme hook', () => {
  it('uses default context values', () => {
    render(
      <ThemeProvider
        value={{
          themeMode: 'light',
          setDarkTheme: () => {},
          setLightTheme: () => {},
        }}
      >
        <MockComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('uses provided context values', () => {
    const setDarkThemeMock = vi.fn();
    const setLightThemeMock = vi.fn();

    render(
      <ThemeProvider
        value={{
          themeMode: 'dark',
          setDarkTheme: setDarkThemeMock,
          setLightTheme: setLightThemeMock,
        }}
      >
        <MockComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText('dark')).toBeInTheDocument();

    screen.getByText('Dark').click();
    expect(setDarkThemeMock).toHaveBeenCalled();

    screen.getByText('Light').click();
    expect(setLightThemeMock).toHaveBeenCalled();
  });
});
