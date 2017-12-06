import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toursComponent } from './tours.component';
import { toursRoutingModule } from './tours.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    toursRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: [],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [toursComponent],
  providers: [],
})
export class toursModule { }
