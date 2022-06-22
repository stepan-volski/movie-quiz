import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IMovie } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  @Input() question!: IMovie;
  @ViewChild('clientAnswerInp') clientAnswerInp!: ElementRef;

  constructor() {}
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
    this.isShowAnswer = !this.isShowAnswer;
  }

  getGenres(): string {
    const genres = this.question.genres;
    return genres.map((genre) => genre.genre).join(', ');
  }
}
