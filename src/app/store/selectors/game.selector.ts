import { IAppState } from '../state/app.state';

export const getMoviesInGame = (state: IAppState) => {
  return state.game.allMoviesInGame;
};

export const getCurrentMovie = (state: IAppState) => {
  return state.game.currentMovie;
};

export const getGameStatus = (state: IAppState) => {
  return state.game.status;
};

export const getCurrentMovieStatus = (state: IAppState) => {
  return state.game.currentMovie.status;
};
