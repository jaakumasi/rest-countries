import { Component, Input } from '@angular/core';
import { Country } from '../../../../shared/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-country-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss',
})
export class CountryDetailsComponent {
  @Input() details!: Country;
}
