import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductionRoutingModule } from './production-routing-module';
import { Production } from './production';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../shared/material-module/material.module';
import { MultiSelectModule } from '../../../shared/components/multi-select/multi-select/multi-select.module';
import { Dashboard } from './dashboard/dashboard';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Details } from './dashboard/details/details';


@NgModule({
  declarations: [
    Production,
    Dashboard,
    Details
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MultiSelectModule,
    ProductionRoutingModule,
    NgApexchartsModule
  ]
})
export class ProductionModule { }
