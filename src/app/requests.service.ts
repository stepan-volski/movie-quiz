import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TopFilmsResponse } from './models/topFilmsResponse.model';
import { FilmFullResponse } from './models/filmFullResponse.model';
import { FilmShortResponse } from './models/filmShortResponse.model';
import { EMPTY, expand, Observable, reduce } from 'rxjs';

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

  getFilm(id: number) {
    const apiUrl = '/api/v2.2/films/' + id;
    return this.http.get<FilmFullResponse>(this.baseUrl + apiUrl);
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

  async getTopFilmIds(){
    let array = await this.getTopFilms().toPromise() as FilmShortResponse[];
    return array.map(el => el.filmId)
  }

}
