import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getMoviesInGame } from 'src/app/store/selectors/game.selector';
import { IAppState, IMovie } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  moviesInGame$ = this._store.select(getMoviesInGame)

  constructor(private router: Router, private _store: Store<IAppState>) { }

  ngOnInit(): void {
    this.moviesInGame$.subscribe(movies => {
      console.log(movies);
    })
  }

  goToResults(){
    this.router.navigate(['/results']);
  }

}
