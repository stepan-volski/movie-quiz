import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GameStatus } from 'src/app/models/game-status';
import { MovieLoadingStatus } from 'src/app/models/movie-loading-status';
import { IMovie } from 'src/app/models/movie.model';
import { QuestionStatus } from 'src/app/models/question-status';
import { TIMER } from 'src/app/shared/constants';
import {
  skipQuestion,
  startLoadingCurrentMovie,
} from 'src/app/store/actions/game.actions';
import {
  getGameData,
  getGameScore,
  getGameStatus,
  getMoviesInGame,
} from 'src/app/store/selectors/game.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  game$ = this._store.select(getGameData);
  subscription?: Subscription;
  score: number = 0;
  currentMovie?: IMovie;
  status: number = GameStatus.NotStarted;
  questionsLeftStr: string = '';
  remainingTime = TIMER;
  timerInterval?: ReturnType<typeof setInterval>;
  isMovieLoaded: boolean = false;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.subscription = this.game$.subscribe((gameData) => {
      this.status = gameData.status;
      this.score = gameData.score;
      this.currentMovie = gameData.allMoviesInGame[gameData.currentMovieIndex];
      this.questionsLeftStr = `${
        gameData.allMoviesInGame.filter(
          (film) => film.status === QuestionStatus.NotAnswered
        ).length
      } / ${gameData.allMoviesInGame.length}`;
      this.isMovieLoaded =
        gameData.allMoviesInGame[gameData.currentMovieIndex]?.loadingStatus ===
          MovieLoadingStatus.Loaded || false;
    });

    this.initTimer();
  }

  ngOnDestroy(): void {
    this.subscription && this.subscription.unsubscribe();
    this.timerInterval && clearInterval(this.timerInterval);
  }

  onSkipQuestion() {
    this._store.dispatch(skipQuestion());
  }

  private initTimer(): void {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1000;
      } else {
        console.log('clear');
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }
}
