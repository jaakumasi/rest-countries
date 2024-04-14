export type Country = {
  name: {
    common: string;
  };
  borders: string[];
  capital: string;
  currencies: string[];
  flags: {
    alt?: string;
    png?: string;
    svg?: string;
  };
  languages: string[];
  population: number;
  region: string;
  subregion: string;
  tld: string; // top level domain
};
