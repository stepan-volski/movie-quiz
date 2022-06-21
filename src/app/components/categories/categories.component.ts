import { Component, OnInit } from '@angular/core';
import { RequestsService } from 'src/app/requests.service';
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
      name: 'Top 250 movies',
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
