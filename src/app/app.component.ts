import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { AppTitleService } from './services/app-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn = false;
  private authSubscription!: Subscription;

  ngOnInit() {
    this.authSubscription = this.authService.getAuthenticationStatus()
        .subscribe(isLoggedIn => {
          this.isLoggedIn = isLoggedIn;
        });
  }

  private _title!: string;
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

  toggleMenu(): void {

    const menu = document.getElementById('sidebarMenu');
    const content = document.querySelector('content') as HTMLElement;
    const button = document.getElementById('menu-toggle');

    if (!menu || !content || !button) {
      console.error('Menu, content, or button element not found');
      return;
    }

    // Button-Sichtbarkeit überprüfen
    const isButtonVisible = window.getComputedStyle(button).display !== 'none';

    if (isButtonVisible) {
      if (menu.style.display === 'block' || menu.style.display === '') {
        menu.style.display = 'none';
        content.style.display = 'block';
      } else {
        menu.style.display = 'block';
        content.style.display = 'none';
      }
    } else {
      // Verhalten, wenn der Button nicht sichtbar ist (optional)
    }
  }
}
