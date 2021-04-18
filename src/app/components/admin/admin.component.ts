import { ViewGroceryListComponent } from '../view-grocery-list/view-grocery-list.component';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GroceryList } from 'src/app/models/GroceryList';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { GroceryListStatus } from 'src/app/models/GroceryListStatus';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDatepicker } from '@angular/material/datepicker';

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
  styleUrls: ['./admin.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})

export class AdminComponent implements OnInit, AfterViewInit {

  groceryListsArray: any = new MatTableDataSource<GroceryList>();
  columnsToDisplay = ['date', 'status', 'consumerName', 'shopName', 'totalCost', 'viewList', 'done', 'dismiss'];
  public resultDialog: GroceryList;
  date = new FormControl();
  todayDate: Date = new Date();
  GroceryListStatus = GroceryListStatus;

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatDatepicker) picker;

 
  constructor(private adminService: AdminService, public dialog: MatDialog, private authorizationService: AuthorizationService) { }

  ngOnInit(): void {
    this.date.setValue(this.todayDate);
    this.adminService.getCurrentMonthsGroceryLists().subscribe(
      (response) => { this.groceryListsArray.data = response as GroceryList[]; },
      (err) => { alert(err.error); }
    )
  }

  ngAfterViewInit() {
    this.groceryListsArray.sort = this.sort;
  }

  monthSelected(params) {
    this.date.setValue(params);
    this.picker.close();
    const chosenDate = new Date(this.date.value);
    const year = chosenDate.getFullYear();
    const month = chosenDate.getMonth() + 1;
    this.adminService.getGroceryListsByYearAndMonth(year, month).subscribe(
      (response) => { this.groceryListsArray.data = response as GroceryList[]; },
      (err) => { alert(err.error); }
    )
  }

  public viewItems(groceryList: GroceryList) {
    this.openDialog(groceryList);
  }

  openDialog(groceryList: GroceryList) {
    const dialogRef = this.dialog.open(ViewGroceryListComponent, {
      width: '700px',
      data: { groceryList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resultDialog = result;
        this.adminService.updateGroceryList(this.resultDialog).subscribe(
          (res) => {
            const idx = this.groceryListsArray.data.findIndex(g => g.id === groceryList.id);
            this.groceryListsArray.data.splice(idx, 1, res);
            this.groceryListsArray._data.next(this.groceryListsArray.data);
            this.table.renderRows();
          },
          (err) => { alert(err.message); }
        );
      }
    });
  }

  changeStatusToFinished(groceryList: GroceryList) {
    groceryList.status = GroceryListStatus.FINISHED;
    this.adminService.updateGroceryList(groceryList).subscribe(
      (res) => {
        const idx = this.groceryListsArray.data.findIndex(g => g.id === groceryList.id);
        this.groceryListsArray.data.splice(idx, 1, res);
      },
      (err) => { alert(err.message); }
    );
  }

  changeStatusToIrrelevant(groceryList: GroceryList) {
    groceryList.status = GroceryListStatus.IRRELEVANT;
    this.adminService.updateGroceryList(groceryList).subscribe(
      (res) => {
        const idx = this.groceryListsArray.data.findIndex(g => g.id === groceryList.id);
        this.groceryListsArray.data.splice(idx, 1, res);
      },
      (err) => { alert(err.message); }
    );
  }

  isPastDate(date: Date) {
    this.todayDate.setHours(0, 0, 0, 0);
    let past = new Date(date);
    if (past < this.todayDate) {
      return true;
    } else {
      return false;
    }
  }

  isRed() {
    return this.groceryListsArray.data.some(x => x.status === GroceryListStatus.ACTIVE && this.isPastDate(x.date));
  }

  public getToken(): string {
    return this.authorizationService.getToken();
  }

  logout() {
    this.adminService.logout(this.getToken()).subscribe(
      () => { this.authorizationService.deleteToken(); },
      (err) => { alert(err.error); });
  }

}
