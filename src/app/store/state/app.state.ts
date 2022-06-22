import { FilmFullResponse } from 'src/app/models/filmFullResponse.model';
import { FilmShortResponse } from 'src/app/models/filmShortResponse.model';
import { GameStatus } from 'src/app/models/game-status';
import { QuestionStatus } from 'src/app/models/question-status';

export interface ICategory {
  id: number;
  name: string;
}

export interface IMovie {
  id: number;
  name: string;
  slogan: string;
  year: number;
  answer: string;
  genres: { genre: string }[];
  posterUrl: string;
  maxScore: number;
  currentScore: number;
  status: number;
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
  status: number;
  mode: string;
  currentMovieIndex: number;
  score: number;
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
  status: GameStatus.NotStarted,
  mode: '',
  score: 0,
  currentMovieIndex: 0,
};

export const initialAppState = {
  categories: initialCategoriesSate,
  game: initialGameState,
};

export function getInitialAppState() {
  return initialAppState;
}
