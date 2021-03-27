import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartsModule } from 'ng2-charts';
import { MatMomentDateModule } from "@angular/material-moment-adapter"; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { Interceptor } from './interceptors/interceptor';
import { AdminComponent, MY_FORMATS } from './components/admin/admin.component';
import { ViewGroceryListComponent } from './components/view-grocery-list/view-grocery-list.component';
import { CreateGroceryListComponent } from './components/create-grocery-list/create-grocery-list.component';
import { AddItemComponent } from './components/add-update-item/add-item.component';
import { ConsumersTableComponent } from './components/consumers-table/consumers-table.component';
import { ConsumerComponent } from './components/consumer/consumer.component';
import { CreateUpdateCustomerComponent } from './components/create-update-customer/create-update-customer.component';
import { ReviewGroceryListComponent } from './components/review-grocery-list/review-grocery-list.component';
import { ViewAllItemsComponent } from './components/view-all-items/view-all-items.component';
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ChartComponent } from './components/chart/chart.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    AdminComponent,
    ViewGroceryListComponent,
    CreateGroceryListComponent,
    AddItemComponent,
    ConsumersTableComponent,
    ConsumerComponent,
    CreateUpdateCustomerComponent,
    ReviewGroceryListComponent,
    ViewAllItemsComponent,
    PrintLayoutComponent,
    StatisticsComponent,
    ChartComponent,
    HomeComponent,




  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ChartsModule,
    MatMomentDateModule

  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
   {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'ILS'
  },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
