// Import-Anweisungen für die notwendigen Angular-Kern- und -Service-Module
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeagueResponse } from 'src/app/models/league';
import { LeaguesService } from 'src/app/services/features/leagues/leagues.service';
import { Router } from '@angular/router';

// Dekorator, der diese Klasse als Angular-Komponente definiert
@Component({
  selector: 'app-league-overview', // Der Selector, wie diese Komponente in Templates verwendet wird
  templateUrl: './league-overview.component.html', // Pfad zur HTML-Vorlage der Komponente
  styleUrls: ['./league-overview.component.css'] // Pfad zu den Stylesheets der Komponente
})
export class LeagueOverviewComponent implements OnInit {
  leagueDetails!: LeagueResponse[]; // Deklaration einer Eigenschaft zur Speicherung der Ligen-Details, mit Typisierung
  @Input() countryName: string | undefined; // Input-Property, um einen Ländernamen von einer übergeordneten Komponente zu erhalten
  @Input() leagues: any; // Input-Property, die verschiedene Ligeninformationen halten kann

  // Konstruktor, der die Angular-Service-Abhängigkeiten injiziert
  constructor(
    private route: ActivatedRoute, // Service für den Zugriff auf Routenparameter
    private leaguesService: LeaguesService, // Eigener Service für Ligendaten
    private router: Router // Service zum Navigieren zwischen Ansichten
  ) {}

  // Methode zum Navigieren zur Detailseite einer Liga
  goToLeagueDetails(leagueId: string) {
    this.router.navigate([`/leagues/league/${leagueId}`]); // Nutzt den Router-Service für die Navigation
  }

  // OnInit-Lebenszyklus-Haken, der beim Initialisieren der Komponente ausgeführt wird
  ngOnInit() {
    this.route.params.subscribe(params => { // Abonnement für Änderungen an den Routenparametern
      const name = params['name']; // Extrahieren des 'name'-Parameters aus der Route
      // Aufruf des Ligendienstes, um Ligen anhand des Ländernamens abzurufen
      this.leaguesService.fetchLeaguesByCountryName(name).subscribe(
        (response: any) => { // Erfolgreicher Abruf der Daten
          console.log('Liga-Details erfolgreich abgerufen:', name);
          const data = response;
          if (data && Array.isArray(data)) { // Überprüfung, ob die Antwort ein Array ist
            this.leagueDetails = data; // Zuweisung der Daten zur Eigenschaft leagueDetails
          }
        },
        (error: any) => { // Fehlerbehandlung
          console.error('Fehler beim Laden der Ligadetails:', error);
        }
      );
    });
  }
}
