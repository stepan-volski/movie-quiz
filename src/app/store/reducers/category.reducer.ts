import { createReducer, on } from '@ngrx/store';
import { selectCategory } from '../actions/categories.actions';
import { getInitialAppState } from '../state/app.state';

const categories = getInitialAppState().categories;

export const categoriesReducer = createReducer(
  categories,
  on(selectCategory, (state, { selectedCategory }) => ({
    ...state,
    selectedCategory: selectedCategory,
  }))
);
