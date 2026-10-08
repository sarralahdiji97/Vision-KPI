import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material-module/material.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar';
import { MatTreeModule } from '@angular/material/tree';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    MatTreeModule
  ],
  exports:[SidebarComponent]
})
export class SidebarModule { }
