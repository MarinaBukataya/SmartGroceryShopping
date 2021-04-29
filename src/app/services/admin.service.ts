import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrator } from '../models/Administrator';
import { Consumer } from '../models/Consumer';
import { GroceryList } from '../models/GroceryList';
import { Item } from '../models/Item';
import { LoginDetails } from '../models/LoginDetails';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BASE_URL = 'https://encoded-breaker-309609.ew.r.appspot.com/admin'
  //private BASE_URL = 'http://localhost:8080/admin'

  constructor(private httpClient: HttpClient) { }

  public signup(administrator: Administrator): Observable<any> {
    return this.httpClient.post<any>(this.BASE_URL + '/administrator', administrator);
  }

  public login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login/' + loginDetails.name + '/' + loginDetails.password, null);
  }

  public getAllConsumers(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/consumers');
  }

  public addConsumer(consumer: Consumer): Observable<any> {
    const cons = { name: consumer.name, password: consumer.password };
    return this.httpClient.post<any>(this.BASE_URL + '/consumers', cons);
  }

  public updateConsumer(consumer: Consumer): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/consumers', consumer);
  }

  public deleteConsumer(consumerId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/consumers/' + consumerId);
  }

  public addGroceryList(groceryList: GroceryList): Observable<any> {
    const gL = { date: groceryList.date, status: groceryList.status, consumerName: groceryList.consumerName, totalCost: groceryList.totalCost, shopName: groceryList.shopName, items: groceryList.items };
    return this.httpClient.post<any>(this.BASE_URL + '/grocerylists', gL);
  }

  public getOneGroceryList(groceryListId: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/grocerylists/' + groceryListId);
  }

  public updateGroceryList(groceryList: GroceryList): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/grocerylists', groceryList);
  }

  public deleteGroceryList(groceryListId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/delete-grocerylist/' + groceryListId);
  }

  public getCurrentMonthsGroceryLists(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/currentmonth-grocerylists');
  }

  public getGroceryListsByYearAndMonth(year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/grocerylists/' + year + '/' + month);
  }

  public getMonthlyExpenses(year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/monthlyexpenses/' + year + '/' + month);
  }

  public addItem(item: Item): Observable<any> {
    const it = { name: item.name, brand: item.brand, category: item.category, quantity: item.quantity, unit: item.unit, price: item.price, cost: item.cost, date: item.date };
    return this.httpClient.post<any>(this.BASE_URL + '/items', it);
  }

  public getAllItems(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/items');
  }

  public getCurrentMonthsItems(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/currentmonth-items');
  }

  public getItemsByYearAndMonth(year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/items/' + year + '/' + month);
  }

  public getItemsByCategory(category: string): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/items/' + category);
  }

  public getItemsByCategoryYearAndMonth(category: string, year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/items/' + category + '/' + year + '/' + month);
  }

  public updateItem(item: Item): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/items', item);
  }

  public deleteItem(itemId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/items/' + itemId);
  }

  public logout(token: string): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/logout/' + token);
  }

}
