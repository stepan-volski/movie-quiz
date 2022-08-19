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
import {
  IMovie,
  MovieLoadingStatus,
  QuestionStatus,
} from 'src/app/models/movie.model';
import { RequestsService } from 'src/app/requests.service';
import { CARDS_SWITCH_TIMER, GAME_TIMER } from 'src/app/shared/constants';
import {
  gameFinished,
  gameInit,
  gameStarted,
  loadCurrentMovieSuccess,
  skipQuestion,
  startLoadingCurrentMovie,
  submitAnswer,
  updateCurrentMovieIndex,
  loadShortMoviesSuccess as loadShortMoviesSuccess,
} from '../actions/game.actions';
import { getGameData, getMoviesInGame } from '../selectors/game.selector';
import { IAppState } from '../state/app.state';

@Injectable()
export class GameEffects {
  loadInitMovies$ = createEffect(() =>
    this._actions$.pipe(
      ofType(gameInit),
      switchMap(() =>
        this._requestsService
          .getTopMovies()
          .pipe(map((movies: IMovie[]) => loadShortMoviesSuccess({ movies })))
      )
    )
  );

  setInitCurrentMovie$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loadShortMoviesSuccess),
        tap(() => {
          this._store.dispatch(updateCurrentMovieIndex({ movieIndex: 0 }));
        }),
        tap(() => this._store.dispatch(gameStarted()))
      ),
    { dispatch: false }
  );

  startLoadingCurrentMovie$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(updateCurrentMovieIndex),
        withLatestFrom(this._store.select(getGameData)),
        tap(([index, gameData]) => {
          if (
            gameData.allMoviesInGame[gameData.currentMovieIndex]
              .loadingStatus === MovieLoadingStatus.NotLoaded
          ) {
            this._store.dispatch(startLoadingCurrentMovie());
          }
        })
      ),
    { dispatch: false }
  );

  loadCurrentMovie$ = createEffect(() =>
    this._actions$.pipe(
      ofType(startLoadingCurrentMovie),
      withLatestFrom(this._store.select(getGameData)),
      switchMap(([empty, gameData]) =>
        this._requestsService
          .getMovie(gameData.allMoviesInGame[gameData.currentMovieIndex].id)
          .pipe(map((movie: IMovie) => loadCurrentMovieSuccess({ movie })))
      )
    )
  );

  startGame$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(gameStarted),
        tap(() => {
          setTimeout(() => this._store.dispatch(gameFinished()), GAME_TIMER);
        })
      ),
    { dispatch: false }
  );

  nextQuestion$ = createEffect(
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

  submitAnswer$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(submitAnswer),
        tap(() =>
          setTimeout(
            () => this._store.dispatch(skipQuestion()),
            CARDS_SWITCH_TIMER
          )
        )
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
