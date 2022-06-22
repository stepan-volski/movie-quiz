import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, map, of, switchAll, switchMap, tap, withLatestFrom } from 'rxjs';
import { FilmShortResponse } from 'src/app/models/filmShortResponse.model';
import { RequestsService } from 'src/app/requests.service';
import {
  gameFinished,
  gameInit,
  gameStarted,
  submitAnswer,
  updateCurrentMovieIndex,
  updateMovies,
} from '../actions/game.actions';
import { getMoviesInGame } from '../selectors/game.selector';
import { IAppState, IMovie } from '../state/app.state';

const TIMER = 5000;

@Injectable()
export class GameEffects {
  initGame$ = createEffect(() =>
    this._actions$.pipe(
      ofType(gameInit),

      switchMap(() =>
        this._requestsService.getTopMovies().pipe(
          map((movies: IMovie[]) => updateMovies({ movies })),
          tap(() =>
            this._store.dispatch(updateCurrentMovieIndex({ movieIndex: 0 }))
          ),
          tap(() => this._store.dispatch(gameStarted())),
          tap(() =>
            setTimeout(() => this._store.dispatch(gameFinished()), TIMER)
          )
        )
      )
    )
  );

  // setTimer$ = createEffect(() =>
  //   this._actions$.pipe(
  //     ofType(gameStarted),
  //     switchMap(() => {
  //       console.log('set timeout');
  //       setTimeout(() => this._store.dispatch(gameFinished()), 5000);
  //     })
  //   )
  // );

  constructor(
    private _actions$: Actions,
    private _requestsService: RequestsService,
    private _store: Store<IAppState>
  ) {}
}
