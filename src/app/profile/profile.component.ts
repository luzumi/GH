import {Component, OnInit, Inject} from '@angular/core';
import {UserProfile} from 'src/app/models/UserProfile';
import {UserDataService, USER_DATA_SERVICE} from '../services/user-data.service';
import {AuthService} from "../auth.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public userProfile: UserProfile | null = null;
    public visitedGamesCount: number = 0;
    public visitedGroundsCount: number = 0;
    public visitedCountriesCount: number = 0;

    constructor(
        @Inject(USER_DATA_SERVICE) private userDataService: UserDataService,
    ) {
    }

    ngOnInit(): void {
        const menu = document.getElementById('sidebarMenu');
        if (menu) {
            menu.style.display = 'none';  // Oder 'block', je nachdem, was Sie beim Laden anzeigen möchten
        }
        // if (AuthService.userId.value && AuthService.userId.value !== "") {
        //     AuthService.userId.next( localStorage.getItem('userId') || '');
        // } else {
        //     console.warn('UserId is missing or empty');
        // }

        this.userDataService.getUserProfile(AuthService.userId.value)
            .then(profile => {
                this.userProfile = profile;
                console.warn('profile', profile)
                this.visitedGamesCount = profile.visitedGames.length;
                const visitedGrounds: string[] = [];
                for (const game of profile.visitedGames) {
                    if (!visitedGrounds.includes(game.place)) {
                        visitedGrounds.push(game.place);
                    }
                }
                this.visitedGroundsCount = visitedGrounds.length;
                const visitedCountries: string[] = [];
                for (const game of profile.visitedGames) {
                    if (!visitedCountries.includes(game.country)) {
                        visitedCountries.push(game.country);
                    }
                }
                this.visitedCountriesCount = visitedCountries.length;
            })
            .catch(err => {
                console.warn('Error getting user profile', err);
            });
    }
}
