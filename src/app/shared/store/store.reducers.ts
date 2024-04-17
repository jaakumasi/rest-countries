import { createReducer, on } from '@ngrx/store';
import { SharedState, state } from './store.state';
import { toggleThemeAction } from './store.actions';
import { IS_DARK_THEME } from '../constants';

export const toggleThemeReducer = createReducer(
  state,
  on(toggleThemeAction, (state: any, action) => {
    // console.log('action value: ', action.value);

    let isDarkTheme;
    console.log('state value: ', state.isDarkTheme);
    console.log('action value: ', action.value);
    if (action.value === undefined) {
      isDarkTheme = state.isDarkTheme === 'true' ? 'false' : 'true';
    } else isDarkTheme = action.value;

    console.log('isDarkTheme -- ', isDarkTheme);

    saveCurrentThemeToLocalStorage(isDarkTheme);
    return {
      ...state,
      isDarkTheme,
    };
  })
);

const saveCurrentThemeToLocalStorage = (isDarkTheme: string) => {
  // console.log('called');

  localStorage.setItem(IS_DARK_THEME, isDarkTheme);
};
