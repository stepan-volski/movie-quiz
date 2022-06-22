import { createAction, props } from '@ngrx/store';
import { IMovie } from '../state/app.state';

export const gameInit = createAction('[Game] Game Init');

export const gameStarted = createAction('[Game] Game Started');

export const gameFinished = createAction('[Game] Game Finished');

export const gameModeChanged = createAction(
  '[Game] Game Mode Changed',
  props<{ mode: string }>()
);

export const skipQuestion = createAction('[Game] Skip Question');

export const answerQuestion = createAction(
  '[Game] Answer Question',
  props<{ answer: string }>()
);

export const updateMovies = createAction(
  '[Game] Update Movies',
  props<{ movies: IMovie[] }>()
);

export const getNextCurrentMovieIndex = createAction(
  '[Game] Get Next Current Movie Index'
);

export const updateCurrentMovieIndex = createAction(
  '[Game] Update Current Movie',
  props<{ movieIndex: number }>()
);

export const submitAnswer = createAction(
  '[Game] Submit Answer',
  props<{ answer: string }>()
);
