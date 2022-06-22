export type FilmShortResponse = {
  filmId: number,
  nameRu: string,
  nameEn: string | null,
  year: number,
  filmLength: string,
  countries: {'country': string}[],
  genres: {'genre': string}[],
  rating: number,
  ratingVoteCount: number,
  posterUrl: string,
  posterUrlPreview: string,
  ratingChange?: string | null,
}
