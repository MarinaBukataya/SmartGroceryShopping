import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDetails } from 'src/app/models/LoginDetails';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { AdminService } from 'src/app/services/admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ConsumerService } from 'src/app/services/consumer.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginDetails = new LoginDetails();

  constructor(private adminService: AdminService, private consumerService: ConsumerService, private authorizationService: AuthorizationService, private router: Router, private notificationService: NotificationService) {

  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      usertype: new FormControl('', Validators.required)
    })

  }


  public login(): void {
    this.loginDetails.type = this.loginForm.get('usertype').value;
    this.loginDetails.name = this.loginForm.get('username').value;
    this.loginDetails.password = this.loginForm.get('password').value;
    if (this.loginDetails.type === 'Administrator') {
      this.adminService.login(this.loginDetails).subscribe(loginRes => {
        let loginResponse: LoginResponse;
        loginResponse = loginRes;
        const token = loginResponse.token;
        this.authorizationService.setToken(token);
        this.router.navigate(['admin']);
      },
        (err) => { this.notificationService.error(err.error) });
    } else {
      this.consumerService.login(this.loginDetails).subscribe(loginRes => {
        let loginResponse: LoginResponse;
        loginResponse = loginRes;
        const token = loginResponse.token;
        this.authorizationService.setToken(token);
        this.router.navigate(['consumer']);
      },
        (err) => { this.notificationService.error(err.error) });
    }
  }

}
