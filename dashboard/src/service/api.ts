import axios from "axios";
import type { ShowDTO, PaginaitonDTO, ImageDTO, GenreDTO, SeasonDTO } from "@/types/api";

type Order = "weight" | "rating";
type OrderDirection = "asc" | "desc";

export interface GetShowsParams {
  query?: string;
  page?: number;
  pageSize?: number;
  orderBy?: Order;
  orderDirection?: OrderDirection;
  genreId?: number;
}

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// delay response .5sec.
// client.interceptors.request.use(
//   (config) => new Promise((resolve) => setTimeout(() => resolve(config), 500))
// );

export function getGenres() {
  return client.get<GenreDTO[]>("/v2/genres");
}

export function getShows(params?: GetShowsParams) {
  return client.get<{ data: ShowDTO[]; meta: PaginaitonDTO }>("/v2/shows", {
    params,
  });
}

export function getShow(showId: number) {
  return client.get<ShowDTO>(`/v1/shows/${showId}`);
}

export function getShowImages(showId: number) {
  return client.get<ImageDTO[]>(`/v1/shows/${showId}/images`);
}

export function getShowSeasons(showId: number) {
  return client.get<SeasonDTO[]>(`/v1/shows/${showId}/seasons`);
}
