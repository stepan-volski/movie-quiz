import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCategory } from 'src/app/store/actions/categories.actions';
import { getSelectedCategory } from 'src/app/store/selectors/categories.selector';

import { ICategory, IAppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() category: ICategory = { id: 0, name: 'something' };
  selectedCategory$ = this._store.select(getSelectedCategory);

  constructor(private _store: Store<IAppState>) {}

  ngOnInit(): void {

  }

  onCategorySelect() {
    this._store.dispatch(selectCategory( {selectedCategory: this.category}));
  }
}
