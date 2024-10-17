import { Component } from '@angular/core';
import { ApplicationRoutes } from '../../shared/enums/routes.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { icon: 'pi-th-large', label: 'Dashboard', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-users', label: 'Employees', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-calendar', label: 'Calendar', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-clock', label: 'Time', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-users', label: 'Teams', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-file', label: 'Documents', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-chart-bar', label: 'Reports', route: ApplicationRoutes.PURCHASE_ORDER_LIST }
  ];
}