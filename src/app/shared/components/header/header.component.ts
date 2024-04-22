import { CommonModule } from '@angular/common';
import {
  Component,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { toggleThemeAction } from '../../store/store.actions';
import { SharedState } from '../../store/store.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  store = inject(Store);
  state$: Observable<SharedState> = this.store.select('toggleThemeReducer');


  toggleTheme() {
    this.store.dispatch(toggleThemeAction({}));
  }
}
