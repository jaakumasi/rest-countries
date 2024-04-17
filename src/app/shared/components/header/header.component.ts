import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { SharedState } from '../../store/store.state';
import { toggleThemeAction } from '../../store/store.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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
