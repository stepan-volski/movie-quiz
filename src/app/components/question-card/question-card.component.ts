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

  hints = [
    { name: 'Hint by year', body: this.question?.year, penalty: 2 },
    { name: 'Hint by actor', body: 'starring Keanu Reeves', penalty: 3 },
    { name: 'Hint by awards', body: 'won an oscar in 1999', penalty: 4 },
    { name: 'Hint by image', body: 'see screenshot', penalty: 5 },
  ];

  ngOnInit(): void {
    this.question = {
      id: 1,
      name: 'matrix',
      slogan: 'There is no spoon',
      year: 2000,
      answer: 'matrix',
      tipNumber: 1,
      genres: [{'genre': 'action'}],
      posterUrl: 'www/poster',
    }
  }

  onAnswerSubmit() {
    this.isShowAnswer = !this.isShowAnswer;
  }
}
