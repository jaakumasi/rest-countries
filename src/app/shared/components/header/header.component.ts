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
export class HeaderComponent implements OnInit {
  store = inject(Store);
  state$!: Observable<SharedState>;

  constructor() {
    // effect(() => {
    //   console.log('dark mode: ', this.isDarkMode);
    // });
  }

  ngOnInit(): void {
    this.state$ = this.store.select('toggleThemeReducer');
    this.state$.subscribe(state => console.log(state))
  }
  
  toggleTheme() {
    this.store.dispatch(toggleThemeAction({}));
  }
}
