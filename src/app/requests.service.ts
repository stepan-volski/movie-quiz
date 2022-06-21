import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TopFilmsResponse } from './models/topFilmsResponse.model';
import { FilmFullResponse } from './models/filmFullResponse.model';
import { FilmShortResponse } from './models/filmShortResponse.model';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://kinopoiskapiunofficial.tech';
  films: FilmShortResponse[] = [];

  getFilmsByParams(pageNum: number){
    const apiUrl = '/api/v2.2/films';

    let queryParams = new HttpParams();
    queryParams = queryParams.append('order', 'RATING');
    queryParams = queryParams.append('type', 'FILM');
    queryParams = queryParams.append('ratingFrom', 8);
    queryParams = queryParams.append('ratingTo', 10);
    queryParams = queryParams.append('yearFrom', 2000);
    queryParams = queryParams.append('yearTo', 2022);
    queryParams = queryParams.append('page', pageNum);

    return this.http.get(this.baseUrl + apiUrl,{params:queryParams});
  }

  getTopFilms(pageNum: number){
    const apiUrl = '/api/v2.2/films/top';
    let queryParams = new HttpParams();
    queryParams = queryParams.append('type', 'TOP_250_BEST_FILMS');
    queryParams = queryParams.append('page', pageNum);

    this.http.get<TopFilmsResponse>(this.baseUrl + apiUrl,{params:queryParams}).subscribe(
      response => {
        this.films.push(...response.films);
        if (pageNum < response.pagesCount) {
          this.getTopFilms(pageNum + 1);
        }
      }
    );
  }

  getFilm(id: number){
    const apiUrl = '/api/v2.2/films/' + id;
    return this.http.get<FilmFullResponse>(this.baseUrl + apiUrl);
  }





}
