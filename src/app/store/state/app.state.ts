export interface ICategory {
  id: number;
  name: string;
}

export interface IMovie {
  // film: ,
  clientAnswer: string,
  tipNumber: number,

}

export interface IAppState {
  categories: ICategoriesState;
  movies: IMoviesState;
}

export interface ICategoriesState {
  categories: ICategory[];
  selectedCategory: ICategory | null;
}

export interface IMoviesState {
  moviesInGame: IMovie[];
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

export const initialMoviesState: IMoviesState = {
  moviesInGame: []
}

export const initialAppState = {
  categories: initialCategoriesSate,
  movies: initialMoviesState,
};

export function getInitialAppState() {
  return initialAppState;
}
