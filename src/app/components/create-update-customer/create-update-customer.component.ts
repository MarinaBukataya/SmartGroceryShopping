import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consumer } from 'src/app/models/Consumer';


export interface DialogData {
  consumer: Consumer;
  type: string
}

@Component({
  selector: 'app-create-update-customer',
  templateUrl: './create-update-customer.component.html',
  styleUrls: ['./create-update-customer.component.scss']
})
export class CreateUpdateCustomerComponent implements OnInit {
  type: string;
  consumerRegistration: FormGroup;
  passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$';

  constructor(public dialogRef: MatDialogRef<CreateUpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.type = data.type;
    if (data.consumer) {

      this.consumerRegistration = new FormGroup({
        id: new FormControl(data.consumer.id),
        name: new FormControl(data.consumer.name, Validators.required),
        password: new FormControl(data.consumer.password, [Validators.required, Validators.pattern(this.passwordPattern)]),
      });
    } else
      this.consumerRegistration = new FormGroup({
        name: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]),
      });

  }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
