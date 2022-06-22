import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
  declarations: [],
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatExpansionModule, MatProgressSpinnerModule ],
  exports: [ MatCardModule, MatButtonModule, MatExpansionModule, MatProgressSpinnerModule ]
})
export class SharedModule { }
