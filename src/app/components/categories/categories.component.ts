import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [
    {
      id: 0,
      name: 'Category 1',
    },
    {
      id: 1,
      name: 'Category 2',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
