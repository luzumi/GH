// season-overview.component.ts
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


@Component({
    selector: 'app-season-overview',
    templateUrl: './season-overview.component.html',
    styleUrls: ['./season-overview.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SeasonOverviewComponent implements OnInit {


  ngOnInit(): void {
    // deine Logik hier
  }
}
