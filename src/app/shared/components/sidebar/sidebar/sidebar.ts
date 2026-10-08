import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { ServiceCode, UserRole } from '../../../enums/general.enum';
import { AuthentificationSerivce } from '../../../services/authentification-service/authentification-serivce';
import { Profile } from '../../../models/client/profile';
import { SidebarData, SidebarFlatNode, SidebarNode } from './SidebarData';
import { EventService } from '../../../services/event-service/event-service.service';

interface SidebarItem {
  name: string;
  routerLink: string[];
  children?: SidebarItem[];
  requiredLevel: UserRole[];
  allowedServices: ServiceCode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent implements OnInit {

  @Input('dataSource') data!: SidebarData;

  @ViewChild('sideMenu', { static: false })
  sideMenu!: MatTree<SidebarNode>;

  private profile!: Profile;

  public isExpended = true;
  public searchValue!: string;
  public sidebarTitle!: string;
  public route!: string[];
  public permission!: boolean;


  // Nouveau tree Angular Material
  dataSource = new MatTreeNestedDataSource<SidebarNode>();

  childrenAccessor = (node: SidebarNode) =>
    node.children ?? [];

  constructor(
    private eventService: EventService,
    private authService: AuthentificationSerivce
  ) {}

  ngOnInit(): void {
 console.log('SIDEBAR isExpended:', this.isExpended);
    this.authService.getProfile().subscribe((prof) => {
      this.profile = prof;
    });

    this.eventService.sidebarDataChange.subscribe((sidebarData) => {

      this.data = sidebarData.sidebarData;

      this.dataSource.data =
        this.filterTree(this.data.menuItem);

    });
  }

  havePermission(node: SidebarNode): boolean {
    return true;
  }

  filterTree(items: SidebarNode[]): SidebarNode[] {

    const newData: SidebarNode[] = [];

    items.forEach((item) => {

      if (!this.havePermission(item)) {
        return;
      }

      if (!item.children || item.children.length === 0) {
        newData.push(item);
        return;
      }

      const children = this.filterTree(item.children);

      if (children.length > 0) {
        newData.push({
          ...item,
          children
        });
      }
    });

    return newData;
  }

  public hasChild = (
    _index: number,
    node: SidebarNode
  ): boolean =>
    !!node.children && node.children.length > 0;
}