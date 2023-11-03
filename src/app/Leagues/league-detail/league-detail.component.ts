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

  createTable(): void {
    // Stelle sicher, dass league und seasons vorhanden sind, bevor du versuchst, sie zu verwenden.
    if (!this.league || !this.league.league || !this.league.seasons) {
      console.error('Die Liga oder die Saison sind nicht definiert');
      return;
    }

    // Die ID und die Saison aus den league Eigenschaften extrahieren.
    const leagueId = +this.league.league.id; // Konvertiere die ID in eine Nummer
    const seasonNumber = this.league.seasons[0]; // Nehme an, dass seasons ein Array von Nummern ist

    // Prüfe, ob die Konvertierung gültige Werte ergab.
    if (isNaN(leagueId) || typeof seasonNumber !== 'number') {
      console.error('Die Liga ID oder die Saison Nummer sind ungültig');
      return;
    }

    // Rufe die createTable Methode des Services mit den korrekten Parametern auf.
    this.leagueService.createTable(leagueId, seasonNumber).subscribe({
      next: (data) => {
        console.log('Tabelle erfolgreich erstellt:', data);
      },
      error: (err) => {
        console.error('Fehler beim Erstellen der Tabelle:', err);
      }
    });
  }

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

