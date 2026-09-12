import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AppTitleService } from '../services/app-title.service';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HeaderComponent {
  title: string;  // Eigenschaft hinzufügen

  constructor(private appTitleService: AppTitleService) {  // Service injizieren
    this.title = this.appTitleService.title;
  }
}
