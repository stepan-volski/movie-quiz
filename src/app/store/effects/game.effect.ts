import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, map, of, switchAll, switchMap, tap } from 'rxjs';
import { FilmShortResponse } from 'src/app/models/filmShortResponse.model';
import { RequestsService } from 'src/app/requests.service';
import { gameInit, gameStarted, updateMovies } from '../actions/game.actions';
import { IAppState, IMovie } from '../state/app.state';

@Injectable()
export class GameEffects {
  initGame$ = createEffect(() =>
    this._actions$.pipe(
      ofType(gameInit),
      switchMap(() =>
        this._requestsService.getTopMovies().pipe(
          map((movies: IMovie[]) => updateMovies({ movies })),
          tap(() => this._store.dispatch(gameStarted()))
        )
      )
    )
  );

  constructor(
    private _actions$: Actions,
    private _requestsService: RequestsService,
    private _store: Store<IAppState>
  ) {}
}
