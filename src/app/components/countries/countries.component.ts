import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedState } from '../../shared/store/store.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.scss',
})
export class CountriesComponent {
  store = inject(Store);
  isDarkMode = false;
  state$!: Observable<SharedState>;

  ngOnInit(): void {
    this.state$ = this.store.select('setStateReducer');
  }
}
