import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './main';
import { PortalComponent } from './portal/portal-component';

const routes: Routes = [{ path: '', component: Main,
  children:[
      { path: '', redirectTo: 'portal', pathMatch: 'full' },
      { path: 'portal', component: PortalComponent },
  ]
 },
  { path: 'management', loadChildren: () => import('./layout/layout-module').then(m => m.LayoutModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
