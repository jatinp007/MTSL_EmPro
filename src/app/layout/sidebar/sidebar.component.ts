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
    { icon: 'pi-receipt', label: 'Purchase', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-calendar', label: 'Sales', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-user', label: 'Vendor', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-tag', label: 'Material', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-file', label: 'Masters', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-chart-bar', label: 'Reports', route: ApplicationRoutes.PURCHASE_ORDER_LIST },
    { icon: 'pi-warehouse', label: 'Inventory', route: ApplicationRoutes.PURCHASE_ORDER_LIST }
  ];
}