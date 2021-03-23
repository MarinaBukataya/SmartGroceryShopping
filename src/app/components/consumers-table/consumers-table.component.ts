import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Consumer } from 'src/app/models/Consumer';
import { AdminService } from 'src/app/services/admin.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { CreateUpdateCustomerComponent } from '../create-update-customer/create-update-customer.component';

@Component({
  selector: 'app-consumers-table',
  templateUrl: './consumers-table.component.html',
  styleUrls: ['./consumers-table.component.scss']
})
export class ConsumersTableComponent implements OnInit {
  consumer = new Consumer();
  consumersArray: any = new MatTableDataSource<Consumer>();
  columnsToDisplay = ['id', 'name', 'password', 'updateConsumer', 'deleteConsumer'];
  public resultDialog: Consumer;

  constructor(public dialog: MatDialog, private adminService: AdminService, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.adminService.getAllConsumers().subscribe(
      (response) => { this.consumersArray.data = response as Consumer[]; },
      (err) => { alert(err.error); }
    )
  }

  public deleteConsumer(consumerId: number) {
    this.adminService.deleteConsumer(consumerId).subscribe(
      () => { this.consumersArray.data = this.consumersArray.data.filter(i => i.id !== consumerId); },
      (err) => { alert(err.message); }
    )
  }
  public addConsumer() {
    this.openDialog(null);
  }
  public updateConsumer(consumer: Consumer) {
    this.openDialog(consumer);
  }
  openDialog(consumer: Consumer) {
    let type: string;
    if (consumer) {
      type = 'Update';

    } else {
      type = 'Add';
    }
    const dialogRef = this.dialog.open(CreateUpdateCustomerComponent, {
      width: '300px',
      data: { consumer, type }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resultDialog = result;
        if (type === 'Add') {

          this.adminService.addConsumer(this.resultDialog).subscribe(
            (res) => {
              this.consumersArray.data.push(res);
              this.consumersArray._data.next(this.consumersArray.data);
            },
            (err) => { alert(err.message); }
          );
        } else {
          this.adminService.updateConsumer(this.resultDialog).subscribe(
            (res) => {
              const idx = this.consumersArray.data.findIndex(i => i.id === consumer.id);
              this.consumersArray.data.splice(idx, 1, res);
              this.consumersArray._data.next(this.consumersArray.data);
            },
            (err) => { alert(err.message); }
          );
        }
      }
    });
  }

  public getToken(): string {
    return this.authorizationService.getToken();
  }

  logout() {
    this.adminService.logout(this.getToken()).subscribe(
      () => { this.authorizationService.deleteToken(); },
      (err) => { alert(err.message); });
  }
}
