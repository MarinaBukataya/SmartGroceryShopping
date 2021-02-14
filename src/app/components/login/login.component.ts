import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/models/LoginDetails';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { AdminService } from 'src/app/services/admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ConsumerService } from 'src/app/services/consumer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginDetails = new LoginDetails();


  constructor(private adminService: AdminService, private authorizationService: AuthorizationService, private consumerService: ConsumerService, private router: Router) { }

  ngOnInit(): void {

  }

  public login(): void {
    if (this.loginDetails.type === 'Administrator') {
      this.adminService.login(this.loginDetails).subscribe(loginRes => {
        let loginResponse: LoginResponse;
        loginResponse = loginRes;
        const token = loginResponse.token;
        this.authorizationService.setToken(token);
        this.router.navigate(['admin']);
      },
        (err) => { alert(err.message); });
    } else {
      this.consumerService.login(this.loginDetails).subscribe(token => {
        this.authorizationService.setToken(token);
      },
        (err) => (err) => { alert(err.error) });
    }
  }

}
