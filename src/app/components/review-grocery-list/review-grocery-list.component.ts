import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GroceryList } from 'src/app/models/GroceryList';
import { Item } from 'src/app/models/Item';
import { ConsumerService } from 'src/app/services/consumer.service';
import { AddItemComponent } from '../add-update-item/add-item.component';
import { SelectionModel } from '@angular/cdk/collections';
import { GroceryListStatus } from 'src/app/models/GroceryListStatus';
import { MatPaginator } from '@angular/material/paginator';


export interface DialogData {
  groceryList: GroceryList;
}

@Component({
  selector: 'app-review-grocery-list',
  templateUrl: './review-grocery-list.component.html',
  styleUrls: ['./review-grocery-list.component.scss']
})
export class ReviewGroceryListComponent {

  groceryList = new GroceryList();
  itemsArray: any = new MatTableDataSource<Item>();
  public resultDialog: Item;
  columnsToDisplay = ['name', 'brand', 'category', 'quantity', 'unit', 'price', 'cost', 'date', 'updateItem', 'select'];
  selection = new SelectionModel<Item>(true, []);
  todayDate: Date = new Date();
  GroceryListStatus = GroceryListStatus;

  constructor(public dialogRef: MatDialogRef<ReviewGroceryListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private consumerService: ConsumerService, public dialog: MatDialog) {
    this.smartCopy(data.groceryList);

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.itemsArray.paginator = this.paginator;
  }
  smartCopy(groceryList: GroceryList) {
    this.consumerService.getOneGroceryList(groceryList.id).subscribe(
      (response) => {
        this.groceryList = response; this.itemsArray.data = this.groceryList.items;
        this.itemsArray.data.filter(item => item.date !== null).forEach(item => this.selection.select(item));
        if (this.groceryList.status !== GroceryListStatus.ACTIVE) {
          this.columnsToDisplay = ['name', 'brand', 'category', 'quantity', 'unit', 'price', 'cost', 'date', 'select'];
        }
      },
      (err) => { alert(err.error); }
    )
  }
  public updateItem(item: Item) {
    this.openDialog(item);
  }

  openDialog(item: Item) {
    let type: string;
    if (item) {
      type = 'Update';

    }
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '300px',
      data: { item, type }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.resultDialog = result;
      this.resultDialog.cost = this.resultDialog.price * this.resultDialog.quantity;
      this.consumerService.updateItem(this.resultDialog).subscribe(
        (res) => {
          const idx = this.itemsArray.data.findIndex(i => i.id === item.id);
          this.itemsArray.data.splice(idx, 1, res);
          this.itemsArray._data.next(this.itemsArray.data);
        },
        (err) => { alert(err.message); }
      );

    });
  }

  close(): void {
    this.groceryList.items = this.itemsArray.data;
    this.groceryList.totalCost = this.getTotalCost();
    this.dialogRef.close(this.groceryList);
  }

  getTotalCost() {
    return this.itemsArray.data.map(t => t.cost).reduce((acc, value) => acc + value, 0).toFixed(2);
  }

  fillTheDate(item: Item) {
    item.date = this.todayDate;
    this.consumerService.updateItem(item).subscribe(
      (res) => {
        const idx = this.itemsArray.data.findIndex(i => i.id === item.id);
        this.itemsArray.data.splice(idx, 1, res);
        // this.itemsArray._data.next(this.itemsArray.data);
      },
      (err) => { alert(err.message); }
    );

  }

  public onNoClick(): void {
    this.dialogRef.close();
  }


}






