import { FormEvent } from 'react';
import UseTheme from '../contexts/theme';

function ThemeBtn() {
  const { themeMode, setLightTheme, setDarkTheme } = UseTheme();

  function onChangeBtn(e: FormEvent<HTMLInputElement>) {
    const darkModeStatus = e.currentTarget.checked;

    if (darkModeStatus) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
    console.log(themeMode);
  }

  return (
    <span className="theme-switch-wrapper">
      <label className="theme-switch" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={onChangeBtn}
          checked={themeMode === 'dark'}
        />
        <div className="slider round"></div>
      </label>
    </span>
  );
}

export default ThemeBtn;
