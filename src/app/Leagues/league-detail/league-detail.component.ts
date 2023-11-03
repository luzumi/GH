// league-detail.component.ts

import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeaguesService} from "../../services/features/leagues/leagues.service";
import {LeagueResponse} from "../../models/league";

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.css']
})
export class LeagueDetailComponent implements OnInit {
  league?: LeagueResponse;

  constructor(private route: ActivatedRoute, private leagueService: LeaguesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let leagueId = params.get('id');

      if (leagueId) {
        this.leagueService.fetchLeaguesByLeagueName(+leagueId).subscribe(
          (data: LeagueResponse) => {
            console.log('Ligadetails erfolgreich abgerufen:', data);
            this.league = data;
          },
          (error: any) => {
            console.error('Fehler beim Laden der Ligadetails:', error);
          }
        );
      }
    });
  }
}

