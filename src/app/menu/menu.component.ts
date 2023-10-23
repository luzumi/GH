// menu.component.ts

import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { UserDataService, USER_DATA_SERVICE } from '../services/user-data.service';


@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  public isCollapsed: boolean = false;
  public userProfile: any;  // Initialisiere die Variable

  items: Array<{
    label: string;
    link: string;
  }> = [
    {
      label: 'Profil',
      link: '/profile/{id}'
    },
    {
      label: 'Länder',
      link: 'countries/all'
    },
    {
      label: 'Meisterschaften',
      link: '/leagues'
    },
    {
      label: 'Vereine',
      link: '/clubs'
    },
    {
      label: 'Grounds',
      link: '/grounds'
    },
    {
      label: 'Statistiken',
      link: '/statistics'
    },
    {
      label: 'Einstellungen',
      link: '/settings'
    }
  ];


  @ViewChild('menu') menu: ElementRef = new ElementRef(this.document.querySelector("#navbarSupportedContent"));

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(USER_DATA_SERVICE) private userDataService: UserDataService) {

  }

  ngOnInit() {
  let menuButton: ElementRef = new ElementRef(this.document.querySelector("#btn"));
  menuButton.nativeElement?.addEventListener('click', () => {
    this.menu.nativeElement.classList.toggle('show');
  });
  this.userDataService.getUserProfile(1).then(profile => {
    this.userProfile = profile;
  });
  }
}
