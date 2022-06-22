import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [],
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatExpansionModule ],
  exports: [ MatCardModule, MatButtonModule, MatExpansionModule ]
})
export class SharedModule { }
