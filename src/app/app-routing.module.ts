import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultsComponent } from './components/results/results.component';


const routes: Routes = [
  { path: '', component: CategoriesComponent, pathMatch: 'full'  },
  { path: 'quiz', component: QuizComponent  },
  { path: 'results', component: ResultsComponent  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
