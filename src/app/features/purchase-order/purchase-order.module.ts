import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { PurchaseOrderListComponent } from './purchase-order-list/purchase-order-list.component';
import { PurchaseOrderFormComponent } from './purchase-order-form/purchase-order-form.component';
import { GeneralDetailsComponent } from './purchase-order-form/general-details/general-details.component';
import { SupplierPaymentDetailsComponent } from './purchase-order-form/supplier-payment-details/supplier-payment-details.component';
import { MaterialDetailsComponent } from './purchase-order-form/material-details/material-details.component';
import { TaxesChargesDetailsComponent } from './purchase-order-form/taxes-charges-details/taxes-charges-details.component';
import { ConfirmationComponent } from './purchase-order-form/confirmation/confirmation.component';
import { SupplierListPopupComponent } from './purchase-order-form/supplier-list-popup/supplier-list-popup.component';
import { MaterialListPopupComponent } from './purchase-order-form/material-list-popup/material-list-popup.component';
import { PurchaseOrderComponent } from './purchase-order.component';


@NgModule({
  declarations: [
    PurchaseOrderListComponent,
    GeneralDetailsComponent,
    SupplierPaymentDetailsComponent,
    MaterialDetailsComponent,
    TaxesChargesDetailsComponent,
    ConfirmationComponent,
    SupplierListPopupComponent,
    MaterialListPopupComponent,
    PurchaseOrderFormComponent,
    PurchaseOrderComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrderRoutingModule
  ]
})
export class PurchaseOrderModule { }
