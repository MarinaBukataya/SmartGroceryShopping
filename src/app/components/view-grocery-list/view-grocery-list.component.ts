import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroceryList } from 'src/app/models/GroceryList';
import { Item } from 'src/app/models/Item';
import { AdminService } from 'src/app/services/admin.service';

export interface DialogData {
  groceryListId: number;
}

@Component({
  selector: 'app-view-grocery-list',
  templateUrl: './view-grocery-list.component.html',
  styleUrls: ['./view-grocery-list.component.scss']
})
export class ViewGroceryListComponent implements OnInit {

  itemsArray: Item[];
  item: Item;
  groceryList: GroceryList;

  columnsToDisplay = ['id', 'name', 'category', 'quantity', 'unit', 'price', 'cost'];

  constructor(public dialogRef: MatDialogRef<ViewGroceryListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private adminService: AdminService) { 
      this.smartCopy(data.groceryListId);
     }
  smartCopy(groceryListId: number) {
    this.adminService.getOneGroceryList(groceryListId).subscribe(
      (response) => { this.groceryList = response, this.itemsArray = this.groceryList.items, console.log(this.groceryList); },
      (err) => { alert(err.error); }
    )
    
  }

  ngOnInit(): void {
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}
