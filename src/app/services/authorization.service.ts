import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private token: string;

  constructor() { }

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
