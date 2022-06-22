import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { GameStatus } from 'src/app/models/game-status';
import { QuestionStatus } from 'src/app/models/question-status';
import {
  answerQuestion,
  gameFinished,
  gameInit,
  gameModeChanged,
  gameStarted,
  skipQuestion,
  submitAnswer,
  updateCurrentMovie,
  updateMovies,
} from '../actions/game.actions';
import { getInitialAppState } from '../state/app.state';

const game = getInitialAppState().game;

export const gameReducer = createReducer(
  game,
  on(gameInit, (state) => ({ ...state, status: GameStatus.Inited })),
  on(gameFinished, (state) => ({ ...state, status: GameStatus.Finished })),
  on(gameStarted, (state) => ({ ...state, status: GameStatus.Started })),
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
    allMoviesInGame: [...movies]
      .sort((a, b) => 0.5 - Math.random())
      .slice(0, 20),
  })),
  on(updateCurrentMovie, (state, { movie }) => ({
    ...state,
    currentMovie: movie,
  })),
  on(submitAnswer, (state, { answer }) => ({
    ...state,
    currentMovie: {
      ...state.currentMovie,
      answer: answer,
      status: QuestionStatus.Answered,
    },
  }))
);
