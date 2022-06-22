import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddHeaderInterceptor } from './addHeaderInterceptor';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CategoriesComponent } from './components/categories/categories.component';
import { appReducers } from './store/reducers/app.reducer';
import { AppRoutingModule } from './app-routing.module';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultsComponent } from './components/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/effects/game.effect';
import { PreloaderComponent } from './components/preloader/preloader.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    QuizComponent,
    ResultsComponent,
    PreloaderComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(appReducers),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    EffectsModule.forRoot([GameEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
