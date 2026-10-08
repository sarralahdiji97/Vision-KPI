/**
 * Sidebar data with nested structure.
 * Each node has a name and an optional list of children.
 */

import { ServiceCode, UserRole } from "../../../enums/general.enum";


export interface SidebarData{
    title: string,
    iconPath: string,
    iconBgColor:string,
    menuItem: SidebarNode[]
}
export interface SidebarNode {
    id: number;
    parentId: number | null;
    name: string;
    icon?: string;
    routerLink?: string;
    height?: string;
    requiredLevel?: UserRole[];
    allowedServices?: ServiceCode[];
    children?: SidebarNode[];
    permission?: boolean
}

/** Sidebar Flat node with expandable and level information */
export interface SidebarFlatNode {
    id: number;
    name: string;
    parentId: number | null;
    icon?: string;
    routerLink?: string;
    expandable: boolean;
    level: number;
    allowedServices?: ServiceCode[];
    requiredLevel?: UserRole[];
}