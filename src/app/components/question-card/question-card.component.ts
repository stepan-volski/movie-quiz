import { getCurrencySymbol } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Store } from '@ngrx/store';
import { movies } from 'src/app/mocks/movies';
import { IMovie } from 'src/app/models/movie.model';
import {
  calculateScore,
  startLoadingCurrentMovie,
  submitAnswer,
  useTip,
} from 'src/app/store/actions/game.actions';
import {
  getCurrentMovie,
  getCurrentMoviePosition,
  getCurrentMovieStatus,
  getGameData,
} from 'src/app/store/selectors/game.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  // question!: IMovie;
  @ViewChild('clientAnswerInp') clientAnswerInp!: ElementRef;
  currentMovieAnswerStatus$ = this._store.select(getCurrentMovieStatus);
  currentMovie$ = this._store.select(getCurrentMovie);
  currentMovieIndex$ = this._store.select(getCurrentMoviePosition);

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this._store
      .select(getGameData)
      .subscribe((gameData) => console.log(gameData));
    // this.currentMovie$.subscribe((movie) => (this.question = movie));
  }

  onAnswerSubmit() {
    const submittedAnswer = this.clientAnswerInp.nativeElement.value;
    this._store.dispatch(submitAnswer({ answer: submittedAnswer }));
    this._store.dispatch(calculateScore({ answer: submittedAnswer }));
  }

  getGenresStr(genres: { genre: string }[]): string {
    return genres.map((genre) => genre.genre).join(', ');
  }

  expandTip(id: number) {
    this._store.dispatch(useTip({ number: id }));
  }
}
