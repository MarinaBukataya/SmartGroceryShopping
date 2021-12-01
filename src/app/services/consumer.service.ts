import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroceryList } from '../models/GroceryList';
import { Item } from '../models/Item';
import { LoginDetails } from '../models/LoginDetails';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})

export class ConsumerService {
  //private BASE_URL = 'https://encoded-breaker-309609.ew.r.appspot.com/consumer'
  private BASE_URL = 'https://fathomless-caverns-76467.herokuapp.com/consumer';

  constructor(private httpClient: HttpClient) { }

  public login(loginDetails: LoginDetails): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.BASE_URL + '/login/' + loginDetails.name + '/' + loginDetails.password, null);
  }

  public getCurrentMonthsGroceryLists(): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/currentmonth-grocerylists');
  }

  public getOneGroceryList(groceryListId: number): Observable<any> {
    return this.httpClient.get<any>(this.BASE_URL + '/grocerylists/' + groceryListId);
  }

  public updateGroceryList(groceryList: GroceryList): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/grocerylists', groceryList);
  }

  public updateItem(item: Item): Observable<any> {
    return this.httpClient.put<any>(this.BASE_URL + '/items', item);
  }

  public logout(token: string): Observable<any> {
    return this.httpClient.delete<any>(this.BASE_URL + '/logout/' + token);
  }

}
