import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login/' + loginDetails.name + '/' + loginDetails.password, null);
  }

  public getCurrentMonthsGroceryLists(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-currentmonth-grocerylists');
  }

  public getGroceryListsByYearAndMonth(year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-grocerylists-byyearandmonth/' + year + '/' + month);
  }

  public getMonthlyExpenses(year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-monthlyexpenses/' + year + '/' + month);
  }

  public getOneGroceryList(groceryListId: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-onegrocerylist/' + groceryListId);
  }

  public addGroceryList(groceryList: GroceryList): Observable<any> {
    const gL = { date: groceryList.date, status: groceryList.status, consumerName: groceryList.consumerName, totalCost: groceryList.totalCost, shopName: groceryList.shopName, items: groceryList.items };
    return this.httpClient.post<any>(this.BASE_URL + '/create-grocerylist', gL);
  }

  public updateGroceryList(groceryList: GroceryList): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/update-grocerylist', groceryList);
  }

  public addItem(item: Item): Observable<any> {
    const it = { name: item.name, brand: item.brand, category: item.category, quantity: item.quantity, unit: item.unit, price: item.price, cost: item.cost, date: item.date };
    return this.httpClient.post<any>(this.BASE_URL + '/add-item', it);
  }

  public updateItem(item: Item): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/update-item', item);
  }

  public deleteItem(itemId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/delete-item/' + itemId);
  }

  public getAllItems(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-allitems');
  }

  public getCurrentMonthsItems(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-currentmonth-items');
  }

  public getItemsByYearAndMonth(year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-items-byyearandmonth/' + year + '/' + month);
  } 

  public getItemsByCategory(category: string): Observable<any>{
    return this.httpClient.get<any>(this.BASE_URL + '/get-items-bycategory/' + category);
  }

  public getItemsByCategoryYearAndMonth(category: string, year: number, month: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-items-bycategoryyearandmonth/' + category + '/' + year + '/' + month);
  } 
  public getAllConsumers(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-allconsumers');
  }

  public addConsumer(consumer: Consumer): Observable<any> {
    const cons = { name: consumer.name, password: consumer.password };
    return this.httpClient.post<any>(this.BASE_URL + '/add-consumer', cons);
  }

  public updateConsumer(consumer: Consumer): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/update-consumer', consumer);
  }

  public deleteConsumer(consumerId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/delete-consumer/' + consumerId);
  }

  public logout(token: string): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/logout/' + token);
  }

}
