import { GroceryListStatus } from 'src/app/models/GroceryListStatus';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { GroceryList } from 'src/app/models/GroceryList';
import { Item } from 'src/app/models/Item';
import { AdminService } from 'src/app/services/admin.service';
import { AddItemComponent } from '../add-update-item/add-item.component';
import { MatPaginator } from '@angular/material/paginator';

export interface DialogData {
  groceryList: GroceryList;
}

@Component({
  selector: 'app-view-grocery-list',
  templateUrl: './view-grocery-list.component.html',
  styleUrls: ['./view-grocery-list.component.scss']
})
export class ViewGroceryListComponent {
  groceryList = new GroceryList();
  GroceryListStatus = GroceryListStatus;
  item = new Item();
  itemsArray: any = new MatTableDataSource<Item>();
  public resultDialog: Item;
  columnsToDisplay = ['position', 'name', 'brand', 'category', 'quantity', 'unit', 'price', 'cost', 'date', 'updateItem', 'deleteItem', 'tick'];

  constructor(public dialogRef: MatDialogRef<ViewGroceryListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private adminService: AdminService, public dialog: MatDialog) {
    this.smartCopy(data.groceryList);
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.itemsArray.paginator = this.paginator;
  }

  smartCopy(groceryList: GroceryList) {
    this.adminService.getOneGroceryList(groceryList.id).subscribe(
      (response) => {
        this.groceryList = response; this.itemsArray.data = this.groceryList.items;
        if (this.groceryList.status !== GroceryListStatus.ACTIVE) {
          this.columnsToDisplay = ['position', 'name', 'brand', 'category', 'quantity', 'unit', 'price', 'cost', 'date', 'tick'];
        }
      },
      (err) => { alert(err.error); }
    )
  }

  close(): void {
    this.groceryList.items = this.itemsArray.data;
    this.groceryList.totalCost = this.getTotalCost();
    this.dialogRef.close(this.groceryList);
  }

  public addItem() {
    this.openDialog(null);
  }

  public updateItem(item: Item) {
    this.openDialog(item);
  }

  public deleteItem(itemId: number) {
    this.adminService.deleteItem(itemId).subscribe(
      () => { this.itemsArray.data = this.itemsArray.data.filter(i => i.id !== itemId); },
      (err) => { alert(err.message) }
    )
  }
  openDialog(item: Item) {
    let type: string;
    if (item) {
      type = 'Update';

    } else {
      type = 'Add';
    }
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '300px',
      data: { item, type }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.resultDialog = result;
      if (type === 'Add') {
        this.resultDialog.cost = this.resultDialog.price * this.resultDialog.quantity;
        this.adminService.addItem(this.resultDialog).subscribe(
          (res) => {
            this.itemsArray.data.push(res);
            this.itemsArray._data.next(this.itemsArray.data);
          },
          (err) => { alert(err.message); }
        );
      } else {
        this.resultDialog.cost = this.resultDialog.price * this.resultDialog.quantity;
        this.adminService.updateItem(this.resultDialog).subscribe(
          (res) => {
            const idx = this.itemsArray.data.findIndex(i => i.id === item.id);
            this.itemsArray.data.splice(idx, 1, res);
            this.itemsArray._data.next(this.itemsArray.data);
          },
          (err) => { alert(err.message); }
        );
      }
    });
  }

  getTotalCost() {
    return this.itemsArray.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }


}
