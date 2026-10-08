import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material-module/material.module';


@NgModule({
  declarations: [
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    MultiSelectComponent
  ]
})
export class MultiSelectModule { }
