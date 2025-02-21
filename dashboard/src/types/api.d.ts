interface ShowDTO {
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

interface RatingDTO {
  average: string;
}

interface GenreDTO {
  id: number;
  name: string;
}

interface PaginaitonDTO {
  page: number;
  pageSize: number;
}

interface ImageDTO {
  id: number;
  type: string;
  main: boolean;
  resolutions: {
    original: ResolutionDTO;
    medium?: ResolutionDTO;
  };
}

interface ResolutionDTO {
  url: string;
  width: number;
  height: number;
}
