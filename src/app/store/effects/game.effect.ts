import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  EMPTY,
  from,
  map,
  of,
  switchAll,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { EMPTY_OBSERVER } from 'rxjs/internal/Subscriber';
import { FilmShortResponse } from 'src/app/models/filmShortResponse.model';
import { QuestionStatus } from 'src/app/models/question-status';
import { RequestsService } from 'src/app/requests.service';
import { TIMER } from 'src/app/shared/constants';
import {
  gameFinished,
  gameInit,
  gameStarted,
  skipQuestion,
  submitAnswer,
  updateCurrentMovieIndex,
  updateMovies,
} from '../actions/game.actions';
import { getGameData, getMoviesInGame } from '../selectors/game.selector';
import { IAppState, IMovie } from '../state/app.state';

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

  skipQuestion$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(skipQuestion),
        withLatestFrom(this._store.select(getGameData)),
        tap(([empty, gameData]) => {
          const nextCurrentIndex = findNextAvailableIndex(
            gameData.allMoviesInGame,
            gameData.currentMovieIndex
          );
          nextCurrentIndex !== -1
            ? this._store.dispatch(
                updateCurrentMovieIndex({ movieIndex: nextCurrentIndex })
              )
            : this._store.dispatch(gameFinished());
        })
      ),
    { dispatch: false }
  );

  constructor(
    private _actions$: Actions,
    private _requestsService: RequestsService,
    private _store: Store<IAppState>
  ) {}
}

function findNextAvailableIndex(movies: IMovie[], curIndex: number) {
  const notAnsweredCount = movies.filter(
    (movie) => movie.status === QuestionStatus.NotAnswered
  ).length;

  if (notAnsweredCount === 0) return -1;

  let resultIndex = curIndex;
  while (true) {
    resultIndex = (resultIndex + 1) % movies.length;
    if (movies[resultIndex].status === QuestionStatus.NotAnswered) {
      return resultIndex;
    }
  }
}
