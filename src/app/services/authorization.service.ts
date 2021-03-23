import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  private token: string;



  constructor() { }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }


  public setToken(token: string) {
    console.log(token);
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public deleteToken() {
    localStorage.removeItem('token');
  }


}
