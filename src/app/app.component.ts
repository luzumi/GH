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



  constructor(
    private appTitleService: AppTitleService,
    private zone: NgZone,
    private authService: AuthService
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

  }

  ngAfterViewInit() {
    this.zone.run(() => {
      this.toggleMenu();
    });
  }

  logout() {
    this.authService.logout();
  }
  toggleMenu(): void {
    console.dir({
      "logged-Auth": AuthService.isLoggedIn.value,
      "menu": this.sidebarMenu?.nativeElement,
      "button": this.menuToggle?.nativeElement,
      "zone": this.zone,
      "title": this.title,
      "appTitleService": this.appTitleService,
      "appTitleService.title": this.appTitleService.title,
    });


    // Überprüfen, ob die Elemente existieren
    if (!this.sidebarMenu?.nativeElement || !this.menuToggle?.nativeElement) {
      console.error('Menu, content, or button element not found');
      return;
    }

    console.log('Menu, content, and button elements found')

    const menu = this.sidebarMenu.nativeElement;
    const button = this.menuToggle.nativeElement;

    // Nutzen der isLoggedIn-Variable
    menu.style.display = AuthService.isLoggedIn.value ? 'block' : 'none';

    button.addEventListener('click', () => {
      const isButtonVisible = window.getComputedStyle(button).display !== 'none';
      if (isButtonVisible) {
        menu.style.display = (menu.style.display === 'block' || menu.style.display === '') ? 'none' : 'block';
      }
    });
  }

  protected readonly AuthService = AuthService;
}
