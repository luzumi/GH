// menu.component.ts

import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {UserDataService, USER_DATA_SERVICE} from '../services/user-data.service';
import {AuthService} from "../auth.service";
import {UserProfile} from "../models/UserProfile";


@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
    public isCollapsed: boolean = false;
    public userProfile: UserProfile | null = null;  // Initialisiere die Variable

    @ViewChild('menu') menu: ElementRef = new ElementRef(
        this.document.querySelector("#navbarSupportedContent"));

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(USER_DATA_SERVICE) private userDataService: UserDataService,) {
    }

    items: Array<{
        label: string;
        link: string;
    }> = [
        {
            label: 'Profil',
            link: '/profile/' + AuthService.userId.value
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
        },
        {
            label: 'Logout',
            link: '/logout'
        }
    ];


    ngOnInit() {
        let menuButton: ElementRef = new ElementRef(this.document.querySelector("#btn"));
        menuButton.nativeElement?.addEventListener('click', () => {
            this.menu.nativeElement.classList.toggle('show');
        });

        // Benutzer-ID abrufen
        AuthService.userId.subscribe(userId => {
            console.log('MENUUUUU: ', userId, AuthService.userId.value);  // BehaviorSubject-Wert direkt abrufen
            if (userId && userId !== "") {  // Überprüfen, ob userId nicht leer ist
                console.log('UserId exists:', userId);
                this.userDataService.getUserProfile(userId)
                    .then(profile => {
                        console.log('Profile received:', profile);
                        this.userProfile = profile;
                    })
                    .catch(error => {
                        console.error('Error fetching profile:', error);
                    });
            } else {
                console.warn('UserId is missing or empty');
            }
        });
    }

    isActive(link: string): boolean {
        return window.location.pathname === link;
    }

}
