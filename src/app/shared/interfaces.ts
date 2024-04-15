export type Country = {
  name: {
    common: string;
    nativeName: any
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
