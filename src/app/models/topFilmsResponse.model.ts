import { FilmShortResponse } from "./filmShortResponse.model"

export type TopFilmsResponse = {
  pagesCount: number,
  films: FilmShortResponse[],
}
