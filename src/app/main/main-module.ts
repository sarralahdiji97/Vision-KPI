import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing-module';
import { Main } from './main';
import { PortalComponent } from './portal/portal-component';
import { MaterialModule } from '../shared/material-module/material.module';
import { NavbarModule } from '../shared/components/navbar/navbar-module';


@NgModule({
  declarations: [
    Main,
    PortalComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    NavbarModule
  ]
})
export class MainModule { }
