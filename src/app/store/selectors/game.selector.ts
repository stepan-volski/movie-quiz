import { IAppState } from '../state/app.state';

export const getMoviesInGame = (state: IAppState) => {
  return state.game.allMoviesInGame;
};

export const getCurrentMovieStatus = (state: IAppState) => {
  return state.game.allMoviesInGame[state.game.currentMovieIndex].status;
};

export const getCurrentMovie = (state: IAppState) => {
  return state.game.allMoviesInGame[state.game.currentMovieIndex];
};

export const getCurrentMoviePosition = (state: IAppState) => {
  return state.game.currentMovieIndex + 1;
};

export const getGameStatus = (state: IAppState) => {
  return state.game.status;
};

export const getGameScore = (state: IAppState) => {
  return state.game.score;
};

export const getGameData = (state: IAppState) => {
  return state.game;
};
