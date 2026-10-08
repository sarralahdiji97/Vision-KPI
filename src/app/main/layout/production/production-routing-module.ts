import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Production } from './production';
import { Dashboard } from './dashboard/dashboard';
import { Details } from './dashboard/details/details';

const routes: Routes = [{ path: '', component: Production,
  children:[
      {path: '', redirectTo: 'dashboard/Efficiency',pathMatch:'full'},
      { path: 'dashboard/:indicator', component: Dashboard},
      { path: 'dashboard/:indicator/details/:drillValue/:project', component: Details},
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule { }
