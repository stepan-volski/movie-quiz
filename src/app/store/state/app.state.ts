import { FilmFullResponse } from 'src/app/models/filmFullResponse.model';
import { FilmShortResponse } from 'src/app/models/filmShortResponse.model';

export interface ICategory {
  id: number;
  name: string;
}

export interface IMovie {
  id: number,
  name: string;
  slogan: string;
  year: number;
  answer: string;
  tipNumber: number;
}

export interface IAppState {
  categories: ICategoriesState;
  game: IGameState;
}

export interface ICategoriesState {
  categories: ICategory[];
  selectedCategory: ICategory | null;
}

export interface IGameState {
  allMoviesInGame: IMovie[];
  nonAnsweredMoviesInGame: IMovie[];
  status: string;
  mode: string;
  currentMovie: IMovie;
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

export const initialGameState: IGameState = {
  allMoviesInGame: [],
  nonAnsweredMoviesInGame: [],
  status: 'Not Started',
  mode: '',
  currentMovie: {
    id: -1,
    name: '',
    slogan: '',
    year: 2000,
    answer: '',
    tipNumber: 0,
  },
};

export const initialAppState = {
  categories: initialCategoriesSate,
  game: initialGameState,
};

export function getInitialAppState() {
  return initialAppState;
}
