import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Tip } from 'src/app/models/movie.model';
import { isAnswerCorrect } from 'src/app/shared/utils';
import { getGameData } from 'src/app/store/selectors/game.selector';
import { IAppState, IGameState } from 'src/app/store/state/app.state';

export interface QuestionResult {
  number: number;
  correctAnswer: string;
  providedAnswer: string;
  usedTips: number;
  maxScore: number;
  score: number;
  isAnswerCorrect: boolean;
}
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  game$ = this._store.select(getGameData);
  score = 0;
  results: QuestionResult[] = [];
  gameSubscription!: Subscription;
  displayedColumns = [
    'number',
    'correctAnswer',
    'providedAnswer',
    'isAnswerCorrect',
    'score',
  ];

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.gameSubscription = this.game$.subscribe((gameData) =>
      this.fillResults(gameData)
    );
  }

  private fillResults(gameData: IGameState) {
    this.score = gameData.score;
    this.results = [];
    gameData.allMoviesInGame.forEach((question, i) => {
      this.results.push({
        number: i + 1,
        correctAnswer: question.name,
        providedAnswer: question.answer,
        usedTips: question.tips.filter((tip) => tip.isUsed).length,
        maxScore: question.maxScore,
        score: question.isAnswerCorrect ? question.maxScore : 0,
        isAnswerCorrect: question.isAnswerCorrect,
      });
    });
  }

  ngOnDestroy(): void {
    this.gameSubscription && this.gameSubscription.unsubscribe();
  }
}
