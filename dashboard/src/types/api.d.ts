export interface ShowDTO {
  id: number;
  name: string;
  type: string;
  language: string;
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  summary: string;
  weight: number;
  updated: string;
  image: {
    medium?: string;
    original?: string;
  };
  rating: RatingDTO;
  genres: string[];
}

export interface RatingDTO {
  average: string;
}

export interface GenreDTO {
  id: number;
  name: string;
}

export interface PaginaitonDTO {
  page: number;
  pageSize: number;
}

export interface ImageDTO {
  id: number;
  type: string;
  main: boolean;
  resolutions: {
    original: ResolutionDTO;
    medium?: ResolutionDTO;
  };
}

export interface ResolutionDTO {
  url: string;
  width: number;
  height: number;
}

export interface SeasonDTO {
  id: number;
  url: string;
  number: number;
  name: string;
  episodeOrder: number;
  premiereDate: string;
  endDate: string;
  network: Network;
  webChannel: any;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}

export interface NetworkDTO {
  id: number;
  name: string;
  country: Country;
  officialSite: string;
}

export interface CountryDTO {
  name: string;
  code: string;
  timezone: string;
}
