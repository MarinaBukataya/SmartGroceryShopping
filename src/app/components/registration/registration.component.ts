import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/models/Administrator';
import { Consumer } from 'src/app/models/Consumer';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MyErrorStateMatcher } from '../login/login.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  administrator = new Administrator();
  consumer = new Consumer();
  registrationForm: FormGroup;
  passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$';
  hide = true;
  matcher = new MyErrorStateMatcher();

  constructor(private adminService: AdminService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
    });

  }

  signup() {

    this.administrator.name = this.registrationForm.get('username').value;
    this.administrator.password = this.registrationForm.get('password').value;
    this.adminService.signup(this.administrator).subscribe(() => {
      this.notificationService.success('Successfully signed up');
      this.router.navigate(['login']);
    },
      (err) => { this.notificationService.error(err.error) });
  }


}
