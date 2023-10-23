export interface CountrySearchOptions {
  name?: string;
  code?: string;
  search?: string;
}

export interface CountryResponse {
  name: string;
  code: string;
  flag: string;
}
