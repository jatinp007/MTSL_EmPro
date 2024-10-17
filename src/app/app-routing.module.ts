import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from './shared/enums/routes.enum';
import { LoginComponent } from './features/auth/login/login.component';
import { VerifyCodeComponent } from './features/auth/verify-code/verify-code.component';
import { PurchaseOrderListComponent } from './features/purchase-order/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderComponent } from './features/purchase-order/purchase-order.component';

const routes: Routes = [
  {
    path: ApplicationRoutes.LOGIN,
    component: LoginComponent
  },
  {
    path: ApplicationRoutes.VERIFICATION_CODE,
    component: VerifyCodeComponent
  },
  {
    path: ApplicationRoutes.PURCHASE_ORDER_CONTAINER,
    component: PurchaseOrderComponent,
    loadChildren: () => 
      import('./features/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
    // children: [
    //   {
    //     path: ApplicationRoutes.PURCHASE_ORDER_CONTAINER,
    //     loadChildren: () => import('./features/purchase-order/purchase-order.module').then(m => m.PurchaseOrderModule),
    //   }
    // ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
