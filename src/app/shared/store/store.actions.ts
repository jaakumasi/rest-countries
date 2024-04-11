import { createAction, props } from '@ngrx/store';

export const toggleThemeAction = createAction(
  'toggle theme',
  props<{ value?: boolean }>()
);
