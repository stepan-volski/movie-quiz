import { createAction, props } from '@ngrx/store';
import { ICategory } from '../state/app.state';

export const selectCategory = createAction(
  '[Category] Select Category',
  props<{ selectedCategory: ICategory }>()
);
