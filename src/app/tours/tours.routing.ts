import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { toursComponent } from './tours.component';

const routes: Routes = [
  { path: '', component: toursComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class toursRoutingModule { }
