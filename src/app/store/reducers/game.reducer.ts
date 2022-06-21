import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import {
  answerQuestion,
  gameFinished,
  gameInit,
  gameModeChanged,
  gameStarted,
  skipQuestion,
  updateMovies,
} from '../actions/game.actions';
import { getInitialAppState } from '../state/app.state';

const game = getInitialAppState().game;

export const gameReducer = createReducer(
  game,
  on(gameInit, (state) => ({ ...state, status: 'Init' })),
  on(gameFinished, (state) => ({ ...state, status: 'Finished' })),
  on(gameStarted, (state) => ({ ...state, status: 'Started' })),
  on(gameModeChanged, (state, { mode }) => ({ ...state, mode: mode })),
  on(skipQuestion, (state) => ({
    ...state,
    currentMovie: state.currentMovie
      ? state.nonAnsweredMoviesInGame[
          state.nonAnsweredMoviesInGame.indexOf(state.currentMovie) + 1
        ]
      : state.nonAnsweredMoviesInGame[0],
  })),
  on(answerQuestion, (state, { answer }) => ({
    ...state,
    currentMovie: { ...state.currentMovie, answer: answer },
  })),
  on(updateMovies, (state, { movies }) => ({
    ...state,
    allMoviesInGame: movies,
  }))
);
