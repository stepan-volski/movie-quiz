import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TopFilmsResponse } from './models/topFilmsResponse.model';
import { FilmFullResponse } from './models/filmFullResponse.model';
import { FilmShortResponse } from './models/filmShortResponse.model';
import {
  delay,
  EMPTY,
  expand,
  filter,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  of,
  reduce,
  repeat,
  retry,
  shareReplay,
  switchMap,
  takeWhile,
  withLatestFrom,
} from 'rxjs';
import { movies } from './mocks/movies';
import {
  IMovie,
  MovieLoadingStatus,
  QuestionStatus,
} from './models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://kinopoiskapiunofficial.tech';
  films: FilmShortResponse[] = [];

  getFilmsByParams(pageNum: number) {
    const apiUrl = '/api/v2.2/films';

    let queryParams = new HttpParams();
    queryParams = queryParams.append('order', 'RATING');
    queryParams = queryParams.append('type', 'FILM');
    queryParams = queryParams.append('ratingFrom', 8);
    queryParams = queryParams.append('ratingTo', 10);
    queryParams = queryParams.append('yearFrom', 2000);
    queryParams = queryParams.append('yearTo', 2022);
    queryParams = queryParams.append('page', pageNum);

    return this.http.get(this.baseUrl + apiUrl, { params: queryParams });
  }

  getMovie(id: number): Observable<IMovie> {
    return this.getFilm(id).pipe(
      switchMap((film: FilmFullResponse) =>
        of({
          name: film.nameRu,
          slogan: film.slogan || film.shortDescription,
          year: film.year,
          answer: '',
          isAnswerCorrect: false,
          id: film.kinopoiskId,
          genres: film.genres,
          posterUrl: film.posterUrl,
          maxScore: 100,
          currentScore: 100,
          tips: [
            {
              tipScore: 10,
              isUsed: false,
            },
            {
              tipScore: 20,
              isUsed: false,
            },
            {
              tipScore: 30,
              isUsed: false,
            },
          ],
          status: QuestionStatus.NotAnswered,
          loadingStatus: MovieLoadingStatus.NotLoaded,
        })
      )
    );
  }

  getFilm(id: number) {
    const apiUrl = '/api/v2.2/films/' + id;
    return this.http.get<FilmFullResponse>(this.baseUrl + apiUrl);
  }

  // getTopMovies(): Observable<FilmFullResponse[]> {
  //   // return this.getTopFilms()
  //   return this.getTopFilmsMock().pipe(map((film) => this.getFilm(film.filmId).subscribe()));
  // }

  // working solution!!!
  // getTopMovies(): Observable<IMovie[]> {
  //   return this.getTopFilmsMock().pipe(
  //     mergeMap((films: FilmShortResponse[]) =>
  //       forkJoin(
  //         films.map((film: FilmShortResponse) =>
  //           this.getFilm(film.filmId).pipe(
  //             map((filmFull: FilmFullResponse) => {
  //               return {
  //                 name: filmFull.nameRu,
  //                 slogan: filmFull.slogan,
  //                 year: filmFull.year,
  //                 answer: '',
  //                 id: film.filmId,
  //                 genres: filmFull.genres,
  //                 posterUrl: filmFull.posterUrl,
  //                 maxScore: 10,
  //                 currentScore: 10,
  //                 status: QuestionStatus.NotAnswered,
  //               };
  //             })
  //           )
  //         )
  //       )
  //     )
  //   );
  // }

  //   this._http.get<any[]>(url).pipe(
  //     mergeMap(arr => forkJoin(arr.map((item) => this._http.get(`someurl/${item.clientId}`).pipe(map((name) => {
  //        item.name = name;
  //        return item;
  //     })
  // ))))

  getTopMovies(): Observable<IMovie[]> {
    // return this.getTopFilms()
    return this.getTopFilmsMock().pipe(
      map((films: FilmShortResponse[]) => {
        const movies: IMovie[] = films.map((film) => {
          return {
            name: film.nameRu,
            slogan: '',
            year: film.year,
            answer: '',
            isAnswerCorrect: false,
            id: film.filmId,
            genres: film.genres,
            posterUrl: film.posterUrl,
            maxScore: 0,
            currentScore: 0,
            tips: [],
            status: QuestionStatus.NotAnswered,
            loadingStatus: MovieLoadingStatus.NotLoaded,
          };
        });
        return movies;
      })
    );
  }

  getTopFilmsMock(): Observable<FilmShortResponse[]> {
    return of(movies).pipe(delay(1000));
  }

  getTopFilms(): Observable<FilmShortResponse[]> {
    let pageNum = 1;
    return this.getTopFilmsCollection(pageNum).pipe(
      expand((response) =>
        response.pagesCount !== pageNum
          ? this.getTopFilmsCollection(++pageNum)
          : EMPTY
      ),
      reduce(
        (acc: FilmShortResponse[], cur: TopFilmsResponse) =>
          (acc = acc.concat(cur.films)),
        []
      )
    );
  }

  private getTopFilmsCollection(pageNum: number): Observable<TopFilmsResponse> {
    let url =
      this.baseUrl +
      '/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=' +
      pageNum;

    return this.http.get<TopFilmsResponse>(url);
  }

  async getTopFilmIds() {
    let array = (await this.getTopFilms().toPromise()) as FilmShortResponse[];
    return array.map((el) => el.filmId);
  }
}
