import { IAppState } from '../state/app.state';

export const getMoviesInGame = (state: IAppState) => {
  return state.game.allMoviesInGame;
};

export const getGameStatus = (state: IAppState) => {
  return state.game.status;
};
