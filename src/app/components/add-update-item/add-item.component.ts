import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/Category';
import { Item } from 'src/app/models/Item';
import { Unit } from 'src/app/models/Unit';

export class DirtyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

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
  smartCopy(i: Item) {
    if (i) {
      this.item.id = i.id;
      this.item.name = i.name;
      this.item.brand = i.brand;
      this.item.category = i.category;
      this.item.quantity = i.quantity;
      this.item.unit = i.unit;
      this.item.price = i.price;
      this.item.date = i.date;

      this.origin.id = i.id;
      this.origin.name = i.name;
      this.origin.brand = i.brand;
      this.origin.category = i.category;
      this.origin.quantity = i.quantity;
      this.origin.unit = i.unit;
      this.origin.price = i.price;
      this.origin.date = i.date;
    } else {
      this.item.id = 0;
      this.item.name = '';
      this.item.brand = '';
      this.item.category = null;
      this.item.quantity = 1;
      this.item.unit = null;  
    }
  }

  public checkChanges(origin: Item, item: Item): boolean {
    return JSON.stringify(origin) === JSON.stringify(item);
  }

  

  public onNoClick(): void {
    this.dialogRef.close();
  }

}
