import { Component, OnInit } from '@angular/core';
import { LoginDetails } from 'src/app/models/LoginDetails';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDetails = new LoginDetails();
  User: any = ['Admin', 'Consumer'];
  constructor() { }

  ngOnInit(): void {
  }

}
