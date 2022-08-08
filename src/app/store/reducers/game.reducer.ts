import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { GameStatus } from 'src/app/models/game-status';
import {
  IMovie,
  MovieLoadingStatus,
  QuestionStatus,
  Tip,
} from 'src/app/models/movie.model';
import { CARDS_COUNT } from 'src/app/shared/constants';
import { isAnswerCorrect } from 'src/app/shared/utils';
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
  calculateScore,
  checkAnswer,
  useTip,
  gameReset,
} from '../actions/game.actions';
import { getInitialAppState, IGameState } from '../state/app.state';

const game = getInitialAppState().game;

export const gameReducer = createReducer(
  game,
  on(gameInit, (state) => ({ ...state, status: GameStatus.Inited })),
  on(gameReset, (state) => ({ ...getInitialAppState().game })),
  on(gameFinished, (state) => ({ ...state, status: GameStatus.Finished })),
  on(gameStarted, (state) => ({ ...state, status: GameStatus.Started })),
  on(gameModeChanged, (state, { mode }) => ({ ...state, mode: mode })),
  on(submitAnswer, (state, { answer }) => ({
    ...state,
    allMoviesInGame: updatedMoviesWithAnswer(state, answer),
  })),
  on(calculateScore, (state, { answer }) => ({
    ...state,
    score: calculateAnswerScore(state, answer),
  })),
  on(useTip, (state, { number }) => ({
    ...state,
    allMoviesInGame: updatedMoviesWithUsedTip(state, number),
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
      (acc: IMovie[], curMovie: IMovie, i) => {
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

function updatedMoviesWithAnswer(state: IGameState, answer: string) {
  return [...state.allMoviesInGame].reduce((acc: IMovie[], movie, i) => {
    let updatedMovie;
    if (i === state.currentMovieIndex) {
      updatedMovie = {
        ...movie,
        answer: answer,
        status: QuestionStatus.Answered,
        isAnswerCorrect: isAnswerCorrect(getCurrentMovie(state).name, answer),
      };
    }
    return [...acc, updatedMovie || movie];
  }, []);
}

function updatedMoviesWithUsedTip(state: IGameState, tipNumber: number) {
  return [...state.allMoviesInGame].reduce(
    (acc: IMovie[], movie: IMovie, i) => {
      let updatedMovie;
      if (i === state.currentMovieIndex) {
        updatedMovie = {
          ...movie,
          currentScore: movie.currentScore - movie.tips[tipNumber].tipScore, 
          tips: [...movie.tips].reduce(
            (accTips: Tip[], tip: Tip, i: number) => {
              let updatedTip = null;
              if (i === tipNumber) {
                updatedTip = { ...tip, isUsed: true };
              }
              return [...accTips, updatedTip || tip];
            },
            []
          ),
        };
      }
      return [...acc, updatedMovie || movie];
    },
    []
  );
}

function getCurrentMovie(state: IGameState) {
  return state.allMoviesInGame[state.currentMovieIndex];
}

function calculateAnswerScore(state: IGameState, answer: string) {
  return getCurrentMovie(state).isAnswerCorrect
    ? state.score +
        getCurrentMovie(state).maxScore -
        getCurrentMovie(state).tips.reduce((acc: number, tip: Tip) => {
          if (tip.isUsed) acc += tip.tipScore;
          return acc;
        }, 0)
    : state.score;
}
