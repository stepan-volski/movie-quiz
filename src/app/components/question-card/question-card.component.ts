import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { submitAnswer } from 'src/app/store/actions/game.actions';
import { getCurrentMovieStatus } from 'src/app/store/selectors/game.selector';
import { IAppState, IMovie } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input() question!: IMovie;
  @ViewChild('clientAnswerInp') clientAnswerInp!: ElementRef;
  currentMovieAnswerStatus$ = this._store.select(getCurrentMovieStatus);

  constructor(private _store: Store<IAppState>) {}
  panelOpenState = false;
  isShowAnswer = false;

  // hints!: { name: string; body: {}; penalty: number }[];

  ngOnInit(): void {
    // this.hints = [
    //   { name: 'Hint by year', body: this.question.year, penalty: 2 },
    //   { name: 'Hint by genres', body: this.question.genres, penalty: 3 },
    //   // { name: 'Hint by awards', body: this, penalty: 4 },
    //   { name: 'Hint by image', body: this.question.posterUrl, penalty: 5 },
    // ];
  }

  onAnswerSubmit() {
    // this.isShowAnswer = !this.isShowAnswer;
    this._store.dispatch(
      submitAnswer({ answer: this.clientAnswerInp.nativeElement.value })
    );
  }

  getGenres(): string {
    const genres = this.question.genres;
    return genres.map((genre) => genre.genre).join(', ');
  }
}
function getCurrentMovieAnswer(getCurrentMovieAnswer: any) {
  throw new Error('Function not implemented.');
}

