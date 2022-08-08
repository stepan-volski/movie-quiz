import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Tip } from 'src/app/models/movie.model';
import { isAnswerCorrect } from 'src/app/shared/utils';
import { gameReset } from 'src/app/store/actions/game.actions';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private _store: Store<IAppState>, private _router: Router) {}

  ngOnInit(): void {
    this.gameSubscription = this.game$.subscribe((gameData) =>
      this.fillResults(gameData)
    );
  }

  toHomePage() {
    this._router.navigate(['/']);
    this._store.dispatch(gameReset());
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
        maxScore: question.currentScore,
        score: question.isAnswerCorrect ? question.currentScore : 0,
        isAnswerCorrect: question.isAnswerCorrect,
      });
    });
  }

  ngOnDestroy(): void {
    this.gameSubscription && this.gameSubscription.unsubscribe();
  }
}
