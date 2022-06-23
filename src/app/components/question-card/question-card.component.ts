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
  @Input() question!: IMovie;
  @ViewChild('clientAnswerInp') clientAnswerInp!: ElementRef;
  currentMovieAnswerStatus$ = this._store.select(getCurrentMovieStatus);

  constructor(private _store: Store<IAppState>) {}

  panelOpenState = false;
  isShowAnswer = false;

  ngOnInit(): void {
  }

  onAnswerSubmit() {
    this._store.dispatch(
      submitAnswer({ answer: this.clientAnswerInp.nativeElement.value })
    );
  }

  getGenres(): string {
    const genres = this.question.genres;
    return genres.map((genre) => genre.genre).join(', ');
  }
}
