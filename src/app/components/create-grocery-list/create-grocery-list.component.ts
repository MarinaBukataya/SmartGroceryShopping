import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Consumer } from 'src/app/models/Consumer';
import { GroceryList } from 'src/app/models/GroceryList';
import { Item } from 'src/app/models/Item';
import { AdminService } from 'src/app/services/admin.service';
import { AddItemComponent } from '../add-update-item/add-item.component';



@Component({
  selector: 'app-create-grocery-list',
  templateUrl: './create-grocery-list.component.html',
  styleUrls: ['./create-grocery-list.component.scss']
})

export class CreateGroceryListComponent implements OnInit {

  exampleForm: FormGroup;
  itemsArray: any = new MatTableDataSource<Item>();
  consumers = [];
  groceryList = new GroceryList();
  item: Item;
  public resultDialog: Item;
  columnsToDisplay = ['name', 'brand', 'category', 'quantity', 'unit', 'updateItem', 'deleteItem'];
  todayDate: Date = new Date();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.itemsArray.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog, private adminService: AdminService) { }

  ngOnInit(): void {
    this.exampleForm = new FormGroup({
      Date: new FormControl(this.todayDate),
      Status: new FormControl('ACTIVE'),
      ConsumerName: new FormControl('', Validators.required),
      ShopName: new FormControl('', Validators.required),
    });
    this.adminService.getAllConsumers().subscribe(
      (response) => { this.consumers = response as Consumer[]; },
      (err) => { alert(err.error); }
    )
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
      if (result) {
        this.resultDialog = result;
        if (type === 'Add') {
          this.resultDialog.cost = this.resultDialog.price * this.resultDialog.quantity;
          this.adminService.addItem(this.resultDialog).subscribe(
            (res) => { this.itemsArray.data.push(res); this.itemsArray._data.next(this.itemsArray.data); },
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
      }
    });
  }

  getTotalCost() {
    return this.itemsArray.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  changeConsumerName(value) {
    console.log(value)
    this.exampleForm.controls.ConsumerName.setValue(value, {
      onlySelf: true
    })
  }

  submitForm() {
    this.groceryList.date = this.exampleForm.get('Date').value;
    this.groceryList.status = this.exampleForm.get('Status').value;
    this.groceryList.consumerName = this.exampleForm.get('ConsumerName').value;
    this.groceryList.totalCost = this.getTotalCost();
    this.groceryList.shopName = this.exampleForm.get('ShopName').value;
    this.groceryList.items = this.itemsArray.data;
    this.adminService.addGroceryList(this.groceryList).subscribe(
      (res) => { },
      (err) => { alert(err.message); }
    );
  }


}
