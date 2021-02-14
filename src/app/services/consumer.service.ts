import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDetails } from '../models/LoginDetails';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {
  private BASE_URL = 'http://localhost:8080/consumer';
  constructor(private httpClient: HttpClient) { }

  public login(loginDetails: LoginDetails): Observable<string> {
    return this.httpClient.post<string>(this.BASE_URL + '/login', null);
  }
}
