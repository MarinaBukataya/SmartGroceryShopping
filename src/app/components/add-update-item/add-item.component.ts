import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';
import { Item } from 'src/app/models/Item';
import { Unit } from 'src/app/models/Unit';


export interface DialogData {
  item: Item;
  type: string
}

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {

  item = new Item();
  origin = new Item();
  category = Category;
  unit = Unit;
  keys = [];
  keys1 = [];
  type: string;
  todayDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.keys = Object.keys(this.category);
    this.keys1 = Object.keys(this.unit);
    this.smartCopy(data.item);
    this.type = data.type;
  }
  smartCopy(item: Item) {
    if (item) {
      this.item.id = item.id;
      this.item.name = item.name;
      this.item.brand = item.brand;
      this.item.category = item.category;
      this.item.quantity = item.quantity;
      this.item.unit = item.unit;
      this.item.price = item.price;
      this.item.date = item.date;

      this.origin.id = item.id;
      this.origin.name = item.name;
      this.origin.brand = item.brand;
      this.origin.category = item.category;
      this.origin.quantity = item.quantity;
      this.origin.unit = item.unit;
      this.origin.price = item.price;
      this.origin.date = item.date;
    } else {
      this.item.id = 0;
      this.item.name = '';
      this.item.brand = '';
      this.item.category = Category.BREAD;
      this.item.quantity = 0;
      this.item.unit = Unit.item;
      this.item.price = 0;
    
    }
  }

  public checkChanges(origin: Item, item: Item): boolean {
    return JSON.stringify(origin) === JSON.stringify(item);
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
