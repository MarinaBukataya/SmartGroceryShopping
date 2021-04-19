import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { ConsumerComponent } from './components/consumer/consumer.component';
import { ConsumersTableComponent } from './components/consumers-table/consumers-table.component';
import { CreateGroceryListComponent } from './components/create-grocery-list/create-grocery-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ViewAllItemsComponent } from './components/view-all-items/view-all-items.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create-list', component: CreateGroceryListComponent },
  { path: 'consumers', component: ConsumersTableComponent },
  { path: 'consumer', component: ConsumerComponent },
  { path: 'items', component: ViewAllItemsComponent },
  { path: '', component: HomeComponent },
  { path: 'statistics', component: StatisticsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
