import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GroceryList } from 'src/app/models/GroceryList';
import { Item } from 'src/app/models/Item';
import { AdminService } from 'src/app/services/admin.service';
import { AddItemComponent } from '../add-item/add-item.component';

@Component({
  selector: 'app-create-grocery-list',
  templateUrl: './create-grocery-list.component.html',
  styleUrls: ['./create-grocery-list.component.scss']
})
export class CreateGroceryListComponent implements OnInit {
  groceryList = new GroceryList();
  item: Item;
  columnsToDisplay = ['id', 'name', 'category', 'quantity', 'unit', 'price', 'cost'];
  resultDialog: Item;
  items: Item[] = [];
  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
  }

  public addItem(): void {
    this.openDialog();
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('*', result, '*');
      this.resultDialog = result;

      this.adminService.addItem(this.resultDialog).subscribe(
        (res) => { this.items.push(res); },
        (err) => { alert(err.message); }
      );
    });
  }
}
