import { Component, OnInit } from '@angular/core';
import { GroceryList } from 'src/app/models/GroceryList';

@Component({
  selector: 'app-create-grocery-list',
  templateUrl: './create-grocery-list.component.html',
  styleUrls: ['./create-grocery-list.component.scss']
})
export class CreateGroceryListComponent implements OnInit {

  groceryList = new GroceryList();

  constructor() { }

  ngOnInit(): void {
  }

  inputEvent(event) {
    this.groceryList.date = new Date(event.value);
  }

  changeEvent(event) {
    this.groceryList.date = new Date(event.value);
  }
}
