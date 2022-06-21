import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultsComponent } from './components/results/results.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  },
  { path: 'quiz', component: QuizComponent  },
  { path: 'results', component: ResultsComponent  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
