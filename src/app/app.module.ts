import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { appReducers } from './store/reducers/app.reducer';

@NgModule({
  declarations: [AppComponent, CategoriesComponent, CategoryComponent],
  imports: [BrowserModule, StoreModule.forRoot(appReducers)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
