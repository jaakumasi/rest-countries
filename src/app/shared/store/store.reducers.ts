import { createReducer, on } from '@ngrx/store';
import { state } from './store.state';
import { toggleThemeAction } from './store.actions';
import { IS_DARK_THEME } from '../constants';

export const toggleThemeReducer = createReducer(
  state,
  on(toggleThemeAction, (state, action) => {
    console.log('action value: ', action.value);

    let isDarkTheme;
    console.log('state theme: ', state.isDarkTheme);
    if (action.value === undefined) {
      isDarkTheme = state.isDarkTheme ? false : true;
    } else isDarkTheme = action.value;

    console.log('isDarkTheme -- ', isDarkTheme);

    saveCurrentThemeToLocalStorage(isDarkTheme);
    return {
      ...state,
      isDarkTheme,
    };
  })
);

const saveCurrentThemeToLocalStorage = (isDarkTheme: boolean) => {
  // console.log('called');

  localStorage.setItem(IS_DARK_THEME, `${isDarkTheme}`);
};
