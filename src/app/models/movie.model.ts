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
    status: QuestionStatus;
    loadingStatus: MovieLoadingStatus;
  }

  export enum MovieLoadingStatus {
    NotLoaded,
    Loaded,
  }

  export enum QuestionStatus {
    NotAnswered,
    Answered,
  }
