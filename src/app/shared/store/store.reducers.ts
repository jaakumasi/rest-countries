import { createReducer, on } from '@ngrx/store';
import { SharedState, state } from './store.state';
import { toggleThemeAction } from './store.actions';
import { IS_DARK_THEME } from '../constants';

export const toggleThemeReducer = createReducer(
  state,
  on(toggleThemeAction, (state: any, action) => {
    let isDarkTheme;
    if (action.value === undefined) {
      isDarkTheme = state.isDarkTheme === 'true' ? 'false' : 'true';
    } else isDarkTheme = action.value;

    saveCurrentThemeToLocalStorage(isDarkTheme);
    return {
      ...state,
      isDarkTheme,
    };
  })
);

const saveCurrentThemeToLocalStorage = (isDarkTheme: string) => {
  localStorage.setItem(IS_DARK_THEME, isDarkTheme);
};
