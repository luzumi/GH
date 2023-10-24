import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './auth.service';
import {AppTitleService} from './services/app-title.service';
import {NgZone} from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarMenu', {static: false}) sidebarMenu!: ElementRef;
  @ViewChild('menuToggle', {static: false}) menuToggle!: ElementRef;

  ngAfterViewInit() {
    this.zone.run(() => {
      this.toggleMenu();
    });
  }

  constructor(
    private appTitleService: AppTitleService,
    private zone: NgZone,
  ) {
    this.title = this.appTitleService.title;

  }

  private _title!: string;
  isLoggedIn: boolean = AuthService.isLoggedIn.value;

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
    this.appTitleService.title = value;  // Update the service
  }



  ngOnInit(): void {
    // Abonniere den isLoggedIn BehaviorSubject.
    AuthService.isLoggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
    // Rest des Codes
  }

  toggleMenu(): void {
    if (!this.sidebarMenu) {
      return;
    }

    if (!AuthService.isLoggedIn || !this.sidebarMenu?.nativeElement || !this.menuToggle?.nativeElement) {
      console.error('Menu, content, or button element not found or user is not logged in');
      return;
    }

    const menu = this.sidebarMenu.nativeElement;
    const button = this.menuToggle.nativeElement;

    button.addEventListener('click', () => {
      // Button-Sichtbarkeit überprüfen
      const isButtonVisible = window.getComputedStyle(button).display !== 'none';
      if (isButtonVisible) {
        if (menu.style.display === 'block' || menu.style.display === '') {
          menu.style.display = 'none';
        } else {
          menu.style.display = 'block';
        }
      } else {
        // Verhalten, wenn der Button nicht sichtbar ist (optional)
      }
    });
  }

}
