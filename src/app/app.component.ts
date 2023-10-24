import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './auth.service';
import {AppTitleService} from './services/app-title.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarMenu', { static: false }) sidebarMenu!: ElementRef;
  @ViewChild('menuToggle', { static: false }) menuToggle!: ElementRef;

  ngAfterViewInit() {
    this.toggleMenu();
  }

  private _title!: string;
  isLoggedIn: any;

  public get title(): string {
    return this._title;
  }

  public set title(value: string) {
    this._title = value;
    this.appTitleService.title = value;  // Update the service
  }

  constructor(private appTitleService: AppTitleService, private authService: AuthService) {
    this.title = this.appTitleService.title;

  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated;
  }

  toggleMenu(): void {
    const menu = this.sidebarMenu.nativeElement;
    const button = this.menuToggle.nativeElement;

    if (!menu || !button) {
      console.error('Menu, content, or button element not found');
      return;
    }

    button.addEventListener('click', () => {
      if (this.isLoggedIn) {
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
      }
    });
  }
}
