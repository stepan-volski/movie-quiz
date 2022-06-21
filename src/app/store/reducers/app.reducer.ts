import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { categoriesReducer } from './category.reducer';
import { moviesReducer } from './movies.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  categories: categoriesReducer,
  movies: moviesReducer,
};
