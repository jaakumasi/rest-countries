import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './shared/components/header/header.component';
import { IS_DARK_THEME } from './shared/constants';
import { toggleThemeAction } from './shared/store/store.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  store = inject(Store);

  ngOnInit(): void {
    // console.log('isDarkMode: ', isDarkMode, ' type: ', typeof isDarkMode)
    const getLocalTheme = localStorage.getItem(IS_DARK_THEME);
    console.log('local theme -- ', getLocalTheme);

    if (getLocalTheme != null) {
      // this.store.dispatch(toggleThemeAction({ value: Boolean(getLocalTheme) }));
    }
  }
}
