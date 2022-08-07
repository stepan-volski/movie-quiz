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
    loadingStatus: number;
  }