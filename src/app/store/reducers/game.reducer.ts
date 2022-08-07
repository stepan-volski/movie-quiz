import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { GameStatus } from 'src/app/models/game-status';
import { MovieLoadingStatus } from 'src/app/models/movie-loading-status';
import { IMovie } from 'src/app/models/movie.model';
import { QuestionStatus } from 'src/app/models/question-status';
import { CARDS_COUNT } from 'src/app/shared/constants';
import {
  answerQuestion,
  gameFinished,
  gameInit,
  gameModeChanged,
  gameStarted,
  getNextCurrentMovieIndex,
  loadCurrentMovieSuccess,
  skipQuestion,
  submitAnswer,
  updateCurrentMovieIndex,
  loadShortMoviesSuccess,
} from '../actions/game.actions';
import { getInitialAppState, } from '../state/app.state';

const game = getInitialAppState().game;

export const gameReducer = createReducer(
  game,
  on(gameInit, (state) => ({ ...state, status: GameStatus.Inited })),
  on(gameFinished, (state) => ({ ...state, status: GameStatus.Finished })),
  on(gameStarted, (state) => ({ ...state, status: GameStatus.Started })),
  on(gameModeChanged, (state, { mode }) => ({ ...state, mode: mode })),
  on(submitAnswer, (state, { answer }) => ({
    ...state,
    score:
      state.score + state.allMoviesInGame[state.currentMovieIndex].currentScore,
    allMoviesInGame: [...state.allMoviesInGame].reduce(
      (acc: IMovie[], movie, i) => {
        let updatedMovie;
        if (i === state.currentMovieIndex) {
          updatedMovie = {
            ...movie,
            answer: answer,
            status: QuestionStatus.Answered,
          };
        }
        return [...acc, updatedMovie || movie];
      },
      []
    ),
  })),
  on(loadShortMoviesSuccess, (state, { movies }) => ({
    ...state,
    allMoviesInGame: [...movies]
      .sort((a, b) => 0.5 - Math.random())
      .slice(0, CARDS_COUNT),
  })),
  on(updateCurrentMovieIndex, (state, { movieIndex }) => ({
    ...state,
    currentMovieIndex: movieIndex,
  })),
  on(loadCurrentMovieSuccess, (state, { movie }) => ({
    ...state,
    allMoviesInGame: [...state.allMoviesInGame].reduce(
      (acc: IMovie[], curMovie, i) => {
        let updatedMovie = { ...curMovie };
        if (i === state.currentMovieIndex) {
          updatedMovie = {
            ...movie,
            loadingStatus: MovieLoadingStatus.Loaded,
          };
        }
        return [...acc, updatedMovie || movie];
      },
      []
    ),
  }))
);
