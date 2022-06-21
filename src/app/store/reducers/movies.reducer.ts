import { createReducer, on } from '@ngrx/store';
import { retrieveMoviesStarted } from '../actions/movies.actions';
import { getInitialAppState } from '../state/app.state';

const movies = getInitialAppState().movies;

export const moviesReducer = createReducer(
  movies,
  on(retrieveMoviesStarted, (state) => ({ ...state }))
);
