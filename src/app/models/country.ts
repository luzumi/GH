export interface CountryResponse {
  "_id": string;
  "_rev": string;
  "name": string;
  "code": string;
  "flag": string;
  "continent": string;
  "leagues": [
    {
      "league": {
        "id": string,
        "name": string,
        "type": string,
        "logo": string
      },
      "country": {
        "name": string,
        "code": string,
        "flag": string
      },
      "seasons": [
        {
          "year": string,
          "start": string,
          "end": string,
          "current": boolean,
          "coverage": {
            "fixtures": {
              "events": boolean,
              "lineups": boolean,
              "statistics_fixtures": boolean,
              "statistics_players": boolean
            },
            "standings": boolean,
            "players": boolean,
            "top_scorers": boolean,
            "top_assists": boolean,
            "top_cards": boolean,
            "injuries": boolean,
            "predictions": boolean,
            "odds": boolean
          }
        }
      ]
    }
  ]
}
