import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layout';

const routes: Routes = [{ 
  path: '', 
  component: Layout,
  children:[
   { path: ':moduleName', loadChildren: () => import('./production/production-module').then(m => m.ProductionModule) }
  ] 
  }, 
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
