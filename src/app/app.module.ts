import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddHeaderInterceptor } from './addHeaderInterceptor';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { appReducers } from './store/reducers/app.reducer';

@NgModule({
  declarations: [AppComponent, CategoriesComponent, CategoryComponent],
  imports: [BrowserModule, StoreModule.forRoot(appReducers), HttpClientModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AddHeaderInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
