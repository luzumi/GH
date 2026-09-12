import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-countries-table',
    templateUrl: './countries-table.component.html',
    styleUrls: ['./countries-table.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CountriesTableComponent {

}
