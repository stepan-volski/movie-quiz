export interface ICategory {
  id: number;
  name: string;
}

export interface IAppState {
  categories: ICategoriesState;
}

export interface ICategoriesState {
  categories: ICategory[];
  selectedCategory: ICategory | null;
}

export const initialCategoriesSate: ICategoriesState = {
  categories: [
    {
      id: 0,
      name: 'Test Category 1',
    },
    {
      id: 1,
      name: 'Test Category 2',
    },
  ],
  selectedCategory: null,
};

export const initialAppState = {
  categories: initialCategoriesSate,
};

export function getInitialAppState() {
  return initialAppState;
}
