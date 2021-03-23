import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { GroceryList } from 'src/app/models/GroceryList';
import { ConsumerService } from 'src/app/services/consumer.service';
import { MY_FORMATS } from '../admin/admin.component';
import { ReviewGroceryListComponent } from '../review-grocery-list/review-grocery-list.component';
import { ViewGroceryListComponent } from '../view-grocery-list/view-grocery-list.component';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class ConsumerComponent implements OnInit {

  groceryListsArray: any = new MatTableDataSource<GroceryList>();;
  groceryList = new GroceryList();
  columnsToDisplay = ['id', 'date', 'status', 'consumerName', 'shopName', 'totalCost', 'viewList'];
  public resultDialog: GroceryList;
  date = new FormControl(moment());
  todayDate: Date = new Date();

  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor(private consumerService: ConsumerService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.consumerService.getCurrentMonthsGroceryLists().subscribe(
      (response) => { this.groceryListsArray.data = response as GroceryList[]; },
      (err) => { alert(err.error); }
    )
  }

  public viewItems(groceryList: GroceryList) {
    this.openDialog(groceryList);
  }

  openDialog(groceryList: GroceryList) {
    const dialogRef = this.dialog.open(ReviewGroceryListComponent, {
      width: '800px',
      data: { groceryList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.resultDialog = result;
        this.consumerService.updateGroceryList(this.resultDialog).subscribe(
          (res) => {
            const idx = this.groceryListsArray.data.findIndex(i => i.id === groceryList.id);
            this.groceryListsArray.data.splice(idx, 1, res);
            this.groceryListsArray._data.next(this.groceryListsArray.data);
            this.table.renderRows();
          },
          (err) => { alert(err.message); }
        );
      }
    });
  }

}
