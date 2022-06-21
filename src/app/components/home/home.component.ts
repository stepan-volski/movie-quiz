import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { gameInit } from 'src/app/store/actions/game.actions';
import { getMoviesInGame } from 'src/app/store/selectors/game.selector';
import { IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  moviesInGame$ = this._store.select(getMoviesInGame);

  constructor(private router: Router, private _store: Store<IAppState>) {}

  ngOnInit(): void {
    this.moviesInGame$.subscribe((movies) =>
      console.log('movies in game ', movies)
    );
  }

  goToQuiz() {
    this.router.navigate(['/quiz']);
    this._store.dispatch(gameInit());
  }
}
