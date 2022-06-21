import { IAppState } from '../state/app.state';

export const getSelectedCategory = (state: IAppState) => {
  return state.categories.selectedCategory;
};
