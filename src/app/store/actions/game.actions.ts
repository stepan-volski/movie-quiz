import { createAction, props } from '@ngrx/store';

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
