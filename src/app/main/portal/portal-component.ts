import { Component } from '@angular/core';
import { Modules, version } from '../../shared/enums/general.enum';
import { AuthentificationSerivce } from '../../shared/services/authentification-service/authentification-serivce';
import { Router } from '@angular/router';

export interface ModuleItem{
  code?:string,
  name: string,
  icon: string,
  routerLink?: string,
  content:string,
  disabled?:boolean
}

@Component({
  selector: 'app-portal-component',
  standalone: false,
  templateUrl: './portal-component.html',
  styleUrl: './portal-component.scss',
})
export class PortalComponent {
  public ModulesList : ModuleItem[] = [];
  public version : string = version;
  public ModuleProd: Modules = Modules.PRODUCTION;

constructor(private authService:AuthentificationSerivce,
            private router:Router
){}

ngOnInit(){
  this.ModulesList = [
    {
    code: Modules.PRODUCTION,
    name: 'Production',
    icon : 'precision_manufacturing',
    routerLink:'/main/management/'+Modules.PRODUCTION,
    content:' Suivi de production, efficience, quantité produite et indicateurs KPI.',
    disabled:false
   },
     {
    code: Modules.QUALITY,
    name: 'Qualité',
    icon : 'verified',
    routerLink:'/main/management/'+Modules.QUALITY,
    content:'  Suivi qualité, contrôles, non-conformités et indicateurs qualité.',
    disabled:true
   },
     {
    code: Modules.LOGISTIC,
    name: 'Logistique',
    icon : 'local_shipping',
    routerLink:'/main/management/'+Modules.LOGISTIC,
    content:'Gestion des flux, mouvements, expéditions et suivi logistique.',
    disabled:true
   },
  {
    code: Modules.RH,
    name: 'Ressources Humaines',
    icon : 'groups',
    routerLink:'/main/management/rh/'+Modules.RH,
    content:'Suivi des effectifs, présence, absence et performance du personnel.',
    disabled:true
   },
    {
    code: Modules.MAINTENANCE,
    name: 'Maintenance',
    icon : 'build',
    routerLink:'/main/management/'+Modules.MAINTENANCE,
    content:'Suivi des équipements, interventions et maintenance.',
    disabled:true
   },
    {
    code: Modules.STOCK,
    name: 'Stock',
    icon : 'inventory_2',
    routerLink:'/main/management/'+Modules.STOCK,
    content:' Gestion des stocks, articles, mouvements et inventaires.',
    disabled:true
   },
   {
    code: Modules.ACHAT,
    name: 'Achats',
    icon : 'shopping_cart',
    routerLink:'/main/management/'+Modules.ACHAT,
    content:' Gestion des fournisseurs, commandes et achats.',
    disabled:true
   },
   {
    code: Modules.FACTURATION,
    name: 'Facturation',
    icon : 'receipt_long',
    routerLink:'/main/management/'+Modules.FACTURATION,
    content:'Gestion des factures, documents et opérations financières.',
    disabled:true
   },
  ]
}

  public openModule(name:string){

  }

    
public logOut() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
