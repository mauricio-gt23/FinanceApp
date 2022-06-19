import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
