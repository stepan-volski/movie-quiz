import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RequestsService } from 'src/app/requests.service';
import { selectCategory } from 'src/app/store/actions/categories.actions';
import { gameInit } from 'src/app/store/actions/game.actions';
import { IAppState, ICategory } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [
    {
      id: 0,
      name: 'Top 250 movies',
    },
  ];

  constructor(private _store: Store<IAppState>, private _router: Router) {}

  ngOnInit(): void {}

  onSelectCategory(id: number) {
    this._store.dispatch(
      selectCategory({ selectedCategory: this.categories[id] })
    );
    this._store.dispatch(gameInit());
    this._router.navigate(['/quiz']);

    console.log(id);
  }
}
