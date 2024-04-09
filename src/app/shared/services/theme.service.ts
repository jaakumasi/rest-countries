import { Injectable, signal } from '@angular/core';
import { THEME } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeValue = signal<string>(THEME.LIGHT);

  toggleTheme() {
    this.themeValue() === THEME.LIGHT
      ? this.themeValue.set(THEME.DARK)
      : this.themeValue.set(THEME.LIGHT);
  }
}
