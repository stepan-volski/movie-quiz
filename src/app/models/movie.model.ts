export interface IMovie {
  id: number;
  name: string;
  slogan: string;
  year: number;
  answer: string;
  isAnswerCorrect: boolean;
  genres: { genre: string }[];
  posterUrl: string;
  maxScore: number;
  currentScore: number;
  tips: Tip[];
  status: QuestionStatus;
  loadingStatus: MovieLoadingStatus;
}

export interface Tip {
  isUsed: boolean;
  tipScore: number;
}

export enum MovieLoadingStatus {
  NotLoaded,
  Loaded,
}

export enum QuestionStatus {
  NotAnswered,
  Answered,
}
