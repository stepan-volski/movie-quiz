import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { movies } from 'src/app/mocks/movies';
import {
  startLoadingCurrentMovie,
  submitAnswer,
} from 'src/app/store/actions/game.actions';
import { getCurrentMovieStatus } from 'src/app/store/selectors/game.selector';
import { IAppState, IMovie } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  private _question!: IMovie;
  @Input() set question(movie: IMovie) {
    this._question = movie;
    if (this.clientAnswerInp) {
      this.clientAnswerInp.nativeElement.value = '';
    }
  }
  get question() {
    return this._question;
  }
  @ViewChild('clientAnswerInp') clientAnswerInp!: ElementRef;
  currentMovieAnswerStatus$ = this._store.select(getCurrentMovieStatus);

  panelOpenState = false;
  isShowAnswer = false;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {}

  onAnswerSubmit() {
    this._store.dispatch(
      submitAnswer({ answer: this.clientAnswerInp.nativeElement.value })
    );
    this.panelOpenState = false;
    this.isShowAnswer = false;
  }

  getGenres(): string {
    const genres = this.question.genres;
    return genres.map((genre) => genre.genre).join(', ');
  }
}
