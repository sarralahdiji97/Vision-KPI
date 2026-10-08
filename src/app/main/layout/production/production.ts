import { Component } from '@angular/core';
import { Modules, OverviewName, UserRole } from '../../../shared/enums/general.enum';
import { SidebarData } from '../../../shared/components/sidebar/sidebar/SidebarData';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../../shared/services/event-service/event-service.service';

@Component({
  selector: 'app-production',
  standalone: false,
  templateUrl: './production.html',
  styleUrl: './production.scss',
})
export class Production {
 TREE_DATA: SidebarData = 
  {
      title: `Production`,
      iconPath: 'precision_manufacturing',
      iconBgColor: 'rgb(235 210 29)',
      menuItem : [
         {
          id: 3,
          parentId: null,
          name: 'Dashboard KPI',
          icon: 'dashboard.png',
          routerLink: '/main/management/'+Modules.PRODUCTION+ '/dashboard/'+OverviewName.Efficience,
          requiredLevel: [UserRole.Admin],
          children:[
            {
                id: 3,
                parentId: null,
                name: 'Efficience',
                icon: 'dashboard.png',
                routerLink: '/main/management/'+Modules.PRODUCTION+ '/dashboard/'+OverviewName.Efficience,
                requiredLevel: [UserRole.Admin],
            },
                {
                id: 3,
                parentId: null,
                name: 'Min Produite',
                icon: 'dashboard.png',
                routerLink: '/main/management/'+Modules.PRODUCTION+ '/dashboard/'+OverviewName.Min_Prod,
                requiredLevel: [UserRole.Admin],
            },
            {
                id: 3,
                parentId: null,
                name: 'Qté Produite',
                icon: 'dashboard.png',
                routerLink: '/main/management/'+Modules.PRODUCTION+ '/dashboard/'+OverviewName.Qty_Prod,
                requiredLevel: [UserRole.Admin],
              },
                 {
                id: 3,
                parentId: null,
                name: 'Temps d\'arrêt',
                icon: 'dashboard.png',
                routerLink: '/main/management/'+Modules.PRODUCTION+ '/dashboard/'+OverviewName.Temps_Arret,
                requiredLevel: [UserRole.Admin],
              },
    
          ]
          
        }
    ]
}

  constructor(
    private eventService : EventService,
    private route: ActivatedRoute,
   ){
     this.route.params.subscribe((parms) => {
       this.eventService.sidebarDataChange.next({
         sidebarData:this.TREE_DATA,
         moduleName: parms['moduleName'],
       });
       
     });
   }
}
