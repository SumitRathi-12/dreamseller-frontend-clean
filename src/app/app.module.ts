import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { VoucherListComponent } from './components/voucher-list/voucher-list.component';
import { ActivityLogComponent } from './components/activity-log/activity-log.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderListComponent,
    AddProductComponent,
    StatisticsComponent,
    VoucherListComponent,       // 👉 Added
    ActivityLogComponent        // 👉 Added
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

