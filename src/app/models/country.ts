export interface CountryResponse {
  name: string;
  code: string;
  flag: string;
  leagues?: Array<{
    "id": number,
    "name": string,
    "type": string,
    "logo": string,
  }> | null;
}
