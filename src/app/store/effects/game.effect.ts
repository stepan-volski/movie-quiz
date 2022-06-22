import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, map, of, switchAll, switchMap, tap, withLatestFrom } from 'rxjs';
import { FilmShortResponse } from 'src/app/models/filmShortResponse.model';
import { RequestsService } from 'src/app/requests.service';
import {
  gameInit,
  gameStarted,
  submitAnswer,
  updateCurrentMovieIndex,
  updateMovies,
} from '../actions/game.actions';
import { getMoviesInGame } from '../selectors/game.selector';
import { IAppState, IMovie } from '../state/app.state';

@Injectable()
export class GameEffects {
  initGame$ = createEffect(() =>
    this._actions$.pipe(
      ofType(gameInit),

      switchMap(() =>
        this._requestsService.getTopMovies().pipe(
          map((movies: IMovie[]) => updateMovies({ movies })),
          tap((result) =>
            this._store.dispatch(updateCurrentMovieIndex({ movieIndex: 0 }))
          ),
          tap(() => this._store.dispatch(gameStarted()))
        )
      )
    )
  );

  // submitAnswer$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(submitAnswer),

  //   )
  // )

  constructor(
    private _actions$: Actions,
    private _requestsService: RequestsService,
    private _store: Store<IAppState>
  ) {}
}
