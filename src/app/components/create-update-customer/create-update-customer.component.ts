import { Component, Inject, OnInit } from '@angular/core';
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
  consumer = new Consumer();
  origin = new Consumer();
  type: string;

  constructor(public dialogRef: MatDialogRef<CreateUpdateCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.smartCopy(data.consumer);
    this.type = data.type;
  }

  ngOnInit(): void {
  }

  smartCopy(consumer: Consumer) {
    if (consumer) {
      this.consumer.id = consumer.id;
      this.consumer.name = consumer.name;
      this.consumer.password = consumer.password;

      this.origin.id = consumer.id;
      this.origin.name = consumer.name;
      this.origin.password = consumer.password;
    }
  }

  public checkChanges(origin: Consumer, consumer: Consumer): boolean {
    return JSON.stringify(origin) === JSON.stringify(consumer);
  }
  
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
