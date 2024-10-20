import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from '../../shared/enums/routes.enum';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { GeneralDetailsComponent } from './purchase-order-form/general-details/general-details.component';
import { SupplierPaymentDetailsComponent } from './purchase-order-form/supplier-payment-details/supplier-payment-details.component';
import { MaterialDetailsComponent } from './purchase-order-form/material-details/material-details.component';
import { TaxesChargesDetailsComponent } from './purchase-order-form/taxes-charges-details/taxes-charges-details.component';
import { ConfirmationComponent } from './purchase-order-form/confirmation/confirmation.component';
import { SupplierListPopupComponent } from './purchase-order-form/supplier-list-popup/supplier-list-popup.component';
import { MaterialListPopupComponent } from './purchase-order-form/material-list-popup/material-list-popup.component';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';

const routes: Routes = [
  { path: '', component: PurchaseOrderListComponent }, // Default component to show list
  { path: ApplicationRoutes.PURCHASE_ORDER_LIST, component: PurchaseOrderListComponent },
  {
    path: ApplicationRoutes.CREATE_PURCHASE_ORDER, 
    // component: PurchaseOrderFormComponent,
    children: [
      { path: 'general-details', component: GeneralDetailsComponent },
      { path: 'supplier-payment-details', component: SupplierPaymentDetailsComponent },
      { path: 'material-details', component: MaterialDetailsComponent },
      { path: 'taxes-charges-details', component: TaxesChargesDetailsComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: '', redirectTo: 'general-details', pathMatch: 'full' }, 
    ],
  },
  {
    path: ':id/edit', 
    component: PurchaseOrderFormComponent,
    children: [
      { path: 'general-details', component: GeneralDetailsComponent },
      { path: 'supplier-payment-details', component: SupplierPaymentDetailsComponent },
      { path: 'material-details', component: MaterialDetailsComponent },
      { path: 'taxes-charges-details', component: TaxesChargesDetailsComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: '', redirectTo: 'general-details', pathMatch: 'full' }, // Redirect to general details
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseOrderRoutingModule { }
