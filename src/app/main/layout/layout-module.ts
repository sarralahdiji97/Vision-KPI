import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing-module';
import { Layout } from './layout';
import { NavbarModule } from '../../shared/components/navbar/navbar-module';
import { SidebarModule } from '../../shared/components/sidebar/sidebar-module';


@NgModule({
  declarations: [
    Layout,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NavbarModule,
    SidebarModule
]
})
export class LayoutModule { }
