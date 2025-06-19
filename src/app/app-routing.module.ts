import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { VoucherListComponent } from './components/voucher-list/voucher-list.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: 'orders', component: OrderListComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'vouchers', component: VoucherListComponent },
  { path: 'activity-log', component: ActivityLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



