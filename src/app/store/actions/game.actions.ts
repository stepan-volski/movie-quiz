import { createAction, props } from '@ngrx/store';
import { IMovie } from 'src/app/models/movie.model';

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

export const loadShortMoviesSuccess = createAction(
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

export const startLoadingCurrentMovie = createAction(
  '[Game] Start Loading Current Movie'
);

export const loadCurrentMovieSuccess = createAction(
  '[Game] Loaded Current Movie',
  props<{ movie: IMovie }>()
);

export const submitAnswer = createAction(
  '[Game] Submit Answer',
  props<{ answer: string }>()
);

export const calculateScore = createAction(
  '[Game] Calculate Score',
  props<{ answer: string }>()
);

export const checkAnswer = createAction(
  '[Game] Check Answer',
  props<{ answer: string }>()
);

export const useTip = createAction(
  '[Game] Use Tip',
  props<{ number: number }>()
);

export const gameReset = createAction('[Game] Reset Game');
