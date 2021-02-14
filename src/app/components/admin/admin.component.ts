import { ViewGroceryListComponent } from './../view-grocery-list/view-grocery-list.component';
import { Component, OnInit } from '@angular/core';
import { GroceryList } from 'src/app/models/GroceryList';
import { FormControl } from '@angular/forms';

import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroceryListComponent } from '../create-grocery-list/create-grocery-list.component';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  groceryListsArray: GroceryList[];
  groceryList: GroceryList;
  columnsToDisplay = ['id', 'date', 'status', 'consumerName', 'shopName', 'totalCost', 'viewList'];
  public resultDialog: GroceryList;
  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(private adminService: AdminService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.adminService.getCurrentMonthsGroceryLists().subscribe(
      (response) => { this.groceryListsArray = response },
      (err) => { alert(err.error); }
    )
  }

  public viewItems(groceryListId: number) {
    this.openDialog(groceryListId);
  }

  openDialog(groceryListId: number) {

    const dialogRef = this.dialog.open(ViewGroceryListComponent, {
      width: '900px',
      data: { groceryListId }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.adminService.getOneGroceryList(groceryListId).subscribe(
        (response) => { this.groceryList = response },
        (err) => { alert(err.error); }
      )
    });
  }

  
}
