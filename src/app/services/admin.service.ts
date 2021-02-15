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

  private BASE_URL = 'http://localhost:8080/admin'

  constructor(private httpClient: HttpClient) { }

  public login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login/' + loginDetails.name + '/' + loginDetails.password, null);
  }

  public getCurrentMonthsGroceryLists(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-currentmonth-grocerylists');
  }

  public getOneGroceryList(groceryListId: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/get-onegrocerylist/' + groceryListId);
  }

  public addGroceryList(groceryList: GroceryList): Observable<any> {
    const gL = { date: groceryList.date, status: groceryList.status, consumerName: groceryList.consumerName, totalCost: groceryList.totalCost, shopName: groceryList.shopName, items: groceryList.items };
    return this.httpClient.post<any>(this.BASE_URL + '/create-grocerylist', gL);
  }

  public addItem(item: Item): Observable<any> {
    const it = { name: item.name, category: item.category, quantity: item.quantity, unit: item.unit, price: item.price, cost: item.cost};
    return this.httpClient.post<any>(this.BASE_URL + '/add-item', it);
  }

  public addConsumer(consumer: Consumer): Observable<any> {
    const cons = { name: consumer.name, password: consumer.password };
    return this.httpClient.post<any>(this.BASE_URL + '/add-consumer', cons, { withCredentials: true });
  }

  public deleteConsumer(consumerId: number): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/delete-consumer/' + consumerId, { withCredentials: true });
  }


}
